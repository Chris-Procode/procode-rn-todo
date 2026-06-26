import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TodoView from '../../components/TodoView';
import { Todo } from '../../models/Todo';
import { useArchivedTodos } from '../../storage/TodoHooks';

const ArchiveScreen = () => {
  const { todos } = useArchivedTodos();

  function renderItem(info: ListRenderItemInfo<Todo>) {
    return <TodoView todo={info.item} />;
  }

  const separator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  if (todos.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.noArchiveText}>{'No Archived Todos...'}</Text>
        </View>
      </View>
    );
  }

  return (
    <FlashList
      data={todos}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={separator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  separator: {
    height: 16,
  },
  panel: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  noArchiveText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ArchiveScreen;
