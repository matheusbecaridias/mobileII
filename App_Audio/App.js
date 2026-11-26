import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useAudioRecorder,
  useAudioRecorderState,
  useAudioPlayer,
  useAudioPlayerStatus,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';

export default function App() {
  // =========================================================================
  // 1. ESTADO PARA GUARDAR O CAMINHO DO ARQUIVO GRAVADO (URI)
  // =========================================================================
  // Quando uma gravação termina, guardamos aqui o caminho do arquivo gravado.
  const [recordedUri, setRecordedUri] = useState(null);

  // =========================================================================
  // 2. HOOK DO GRAVADOR (useAudioRecorder & useAudioRecorderState)
  // =========================================================================
  // O hook useAudioRecorder gerencia o ciclo de vida da gravação e memória.
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // O hook useAudioRecorderState nos dá informações em tempo real da gravação:
  // - isRecording: verdadeiro se estiver gravando
  // - durationMillis: tempo decorrido da gravação em milissegundos
  const recorderState = useAudioRecorderState(audioRecorder, 500);

  // =========================================================================
  // 3. HOOK DO REPRODUTOR (useAudioPlayer & useAudioPlayerStatus)
  // =========================================================================
  // O hook useAudioPlayer carrega o áudio gravado quando a URI existir.
  const player = useAudioPlayer(recordedUri);

  // O hook useAudioPlayerStatus nos informa se está tocando e a duração atual.
  const playerStatus = useAudioPlayerStatus(player);

  // =========================================================================
  // 4. FUNÇÕES DE CONTROLE (Gravar, Parar, Tocar e Descartar)
  // =========================================================================

  // Função para solicitar permissão do microfone
  async function requestMicrophonePermission() {
    const permission = await requestRecordingPermissionsAsync();
    return permission.granted;
  }

  // Ação: Iniciar a Gravação
  async function handleStartRecording() {
    try {
      // 1° Passo: Solicita permissão ao usuário
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso ao microfone nas permissões do aparelho para gravar.'
        );
        return;
      }

      // 2° Passo: Configura o sistema operacional para aceitar gravação
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      // 3° Passo: Prepara o gravador e inicia a captura
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      // Limpa gravação anterior se existia
      setRecordedUri(null);
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a gravação.');
    }
  }

  // Ação: Parar a Gravação
  async function handleStopRecording() {
    try {
      // Para a gravação atual
      await audioRecorder.stop();

      // Salva o caminho do arquivo gerado no estado
      setRecordedUri(audioRecorder.uri);
    } catch (error) {
      console.error('Erro ao parar gravação:', error);
      Alert.alert('Erro', 'Não foi possível finalizar a gravação.');
    }
  }

  // Ação: Tocar ou Pausar o Áudio Gravado
  async function handleTogglePlay() {
    try {
      if (!player) return;

      if (playerStatus.playing) {
        player.pause();
      } else {
        // Se a reprodução já chegou ao fim, voltamos para o início (segundo 0)
        if (
          playerStatus.currentTime >= playerStatus.duration &&
          playerStatus.duration > 0
        ) {
          await player.seekTo(0);
        }
        player.play();
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      Alert.alert('Erro', 'Não foi possível reproduzir o áudio.');
    }
  }

  // Ação: Descartar o áudio gravado para começar um novo
  function handleDiscard() {
    if (playerStatus.playing) {
      player.pause();
    }
    setRecordedUri(null);
  }

  // Função auxiliar para formatar segundos em formato "00:00"
  function formatTime(totalSeconds) {
    if (!totalSeconds || isNaN(totalSeconds)) return '00:00';
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // =========================================================================
  // 5. INTERFACE VISUAL (JSX)
  // =========================================================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Cabeçalho da Aula */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎙️ Gravador de Áudio</Text>
        <Text style={styles.headerSubtitle}>
          App didático para aprender gravação no Expo Go
        </Text>
      </View>

      {/* Cartão de Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>STATUS ATUAL</Text>

        <Text
          style={[
            styles.statusText,
            recorderState.isRecording && styles.textRecording,
            playerStatus.playing && styles.textPlaying,
          ]}
        >
          {recorderState.isRecording
            ? '🔴 Gravando...'
            : playerStatus.playing
            ? '🔊 Reproduzindo...'
            : recordedUri
            ? '✅ Áudio Gravado com Sucesso!'
            : '⚪ Pronto para gravar'}
        </Text>

        {/* Mostrador de tempo durante a gravação */}
        {recorderState.isRecording && (
          <Text style={styles.timerText}>
            ⏱️ {formatTime((recorderState.durationMillis || 0) / 1000)}
          </Text>
        )}

        {/* Mostrador de tempo durante a reprodução */}
        {recordedUri && !recorderState.isRecording && (
          <Text style={styles.playbackTimeText}>
            ⏱️ {formatTime(playerStatus.currentTime)} / {formatTime(playerStatus.duration)}
          </Text>
        )}
      </View>

      {/* Seção de Botões */}
      <View style={styles.buttonContainer}>
        {/* BOTÃO 1: Gravar ou Parar */}
        <TouchableOpacity
          style={[
            styles.btn,
            recorderState.isRecording ? styles.btnStop : styles.btnRecord,
          ]}
          onPress={
            recorderState.isRecording
              ? handleStopRecording
              : handleStartRecording
          }
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {recorderState.isRecording
              ? '⏹ Parar Gravação'
              : '🎙 Iniciar Gravação'}
          </Text>
        </TouchableOpacity>

        {/* BOTÕES EXTRAS (Aparecem quando já existe um áudio gravado) */}
        {recordedUri && !recorderState.isRecording && (
          <>
            <TouchableOpacity
              style={[styles.btn, styles.btnPlay]}
              onPress={handleTogglePlay}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>
                {playerStatus.playing ? '⏸ Pausar' : '▶ Ouvir Gravação'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDiscard]}
              onPress={handleDiscard}
              activeOpacity={0.8}
            >
              <Text style={styles.btnDiscardText}>🗑 Gravar Novo Áudio</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Caixa didática de explicação para os alunos */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Como funciona nos bastidores:</Text>
        <Text style={styles.infoItem}>1. Pede permissão de microfone ao celular.</Text>
        <Text style={styles.infoItem}>2. Grava a voz e salva um arquivo local temporário.</Text>
        <Text style={styles.infoItem}>3. Carrega o arquivo gravado e reproduz nos alto-falantes.</Text>
      </View>
    </SafeAreaView>
  );
}

// =========================================================================
// 6. ESTILOS DO APLICATIVO
// =========================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    textAlign: 'center',
  },
  textRecording: {
    color: '#EF4444',
  },
  textPlaying: {
    color: '#2563EB',
  },
  timerText: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '700',
    color: '#DC2626',
    fontVariant: ['tabular-nums'],
  },
  playbackTimeText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    fontVariant: ['tabular-nums'],
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  btn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRecord: {
    backgroundColor: '#EF4444',
  },
  btnStop: {
    backgroundColor: '#1E293B',
  },
  btnPlay: {
    backgroundColor: '#2563EB',
  },
  btnDiscard: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  btnDiscardText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 6,
  },
  infoItem: {
    fontSize: 13,
    color: '#1E40AF',
    marginTop: 2,
    lineHeight: 18,
  },
});
