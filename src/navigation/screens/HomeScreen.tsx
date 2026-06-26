import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import TodoView from '../../components/TodoView';
import { Todo } from '../../models/Todo';
import { useTodos } from '../../storage/TodoHooks';

const HomeScreen = () => {
  const { todos } = useTodos();

  function renderItem(info: ListRenderItemInfo<Todo>) {
    return <TodoView todo={info.item} />;
  }

  const separator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

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
});

export default HomeScreen;
