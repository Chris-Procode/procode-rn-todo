import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Checkbox } from 'expo-checkbox';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Todo } from '../models/Todo';
import { RootParamList } from '../navigation/RootNavigator';
import { RootScreens } from '../navigation/screens/Screens';
import { useTodoMethods } from '../storage/TodoHooks';

type Props = {
  todo: Todo;
};

const TodoView = ({ todo }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const todoMethods = useTodoMethods();

  const isComplete = todo.completedAt !== undefined;

  function completeTodo(isComplete: boolean) {
    if (isComplete) {
      todoMethods.completeTodo(todo);
      return;
    }
    todoMethods.incompleteTodo(todo);
  }

  function openTodo() {
    navigation.navigate(RootScreens.Todo, { todoId: todo.id });
  }

  return (
    <TouchableOpacity onPress={openTodo} style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, isComplete && styles.strikeThrough]}
          numberOfLines={1}
        >
          {todo.title}
        </Text>
        <Text
          style={[styles.description, isComplete && styles.strikeThrough]}
          numberOfLines={1}
        >
          {todo.description}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Checkbox
          hitSlop={15}
          value={isComplete}
          onValueChange={completeTodo}
          color={'blue'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    justifyContent: 'center',
    gap: 4,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
});

export default TodoView;
