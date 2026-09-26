// scenes/To-Do-List/App.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { PALETTE } from '../../theme';

export default function TodoListScreen({ usuario, onAvancarParaCesta, onGanharXP }) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(['',]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
      if (onGanharXP) onGanharXP();
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {/* CARD DO INVENTÁRIO */}
      <View style={styles.card}>
        <View style={styles.badgeHeader}>
         
        </View>

        <Text style={styles.title}>Lista de compras de {usuario?.nome || 'Aventureiro'}</Text>
        <Text style={styles.desc}>Adicione os itens necessários </Text>

        <View style={styles.inputRow}>
          <TextInput
            label="Novo item"
            mode="flat"
            value={task}
            onChangeText={setTask}
            textColor={PALETTE.textLight}
            style={styles.input}
            theme={{ colors: { primary: PALETTE.accent, onSurfaceVariant: PALETTE.textMuted } }}
          />
          <TouchableOpacity style={styles.btnAdd} onPress={addTask}>
            <Text style={styles.btnAddText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.btnClear} onPress={() => setTasks([])}>
            <Text style={styles.btnClearText}>Esvaziar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnAvancar}
            onPress={() => onAvancarParaCesta(tasks)}
          >
            <Text style={styles.btnAvancarText}>Ir à Feira ➔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LISTA DE ITENS COMO SLOTS DE RPG */}
      <Text style={styles.slotsTitle}>Itens adicionados ({tasks.length})</Text>
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemSlot}>
            <Text style={styles.itemIcon}>📦</Text>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeTask(index)}>
              <Text style={styles.deleteIcon}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Mochila vazia! Adicione itens para farmar XP.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bgDark,
    padding: 16,
  },
  card: {
    backgroundColor: PALETTE.cardDark,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: PALETTE.primary,
    borderBottomWidth: 5,
    borderBottomColor: PALETTE.deepWood,
  },
  badgeHeader: {
    alignSelf: 'center',
    backgroundColor: PALETTE.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 14,
    marginBottom: 6,
  },
  badgeText: {
    color: PALETTE.accent,
    fontWeight: 'bold',
    fontSize: 11,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: PALETTE.rose,
    textAlign: 'center',
  },
  desc: {
    fontSize: 12,
    color: PALETTE.textMuted,
    textAlign: 'center',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: PALETTE.deepWood,
    borderRadius: 8,
  },
  btnAdd: {
    backgroundColor: PALETTE.accent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderBottomColor: PALETTE.primary,
  },
  btnAddText: {
    color: '#042414',
    fontWeight: '900',
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  btnClear: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PALETTE.terracotta,
    alignItems: 'center',
  },
  btnClearText: {
    color: PALETTE.rose,
    fontSize: 12,
    fontWeight: 'bold',
  },
  btnAvancar: {
    flex: 2,
    backgroundColor: PALETTE.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PALETTE.accent,
    borderBottomWidth: 3,
    borderBottomColor: PALETTE.deepWood,
  },
  btnAvancarText: {
    color: PALETTE.textLight,
    fontWeight: 'bold',
    fontSize: 13,
  },
  slotsTitle: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 'bold',
    color: PALETTE.rose,
  },
  itemSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.cardDark,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: PALETTE.primary,
  },
  itemIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    color: PALETTE.textLight,
    fontWeight: '600',
    fontSize: 14,
  },
  deleteIcon: {
    color: PALETTE.terracotta,
    fontWeight: 'bold',
    fontSize: 16,
    padding: 4,
  },
  emptyText: {
    color: PALETTE.textMuted,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
