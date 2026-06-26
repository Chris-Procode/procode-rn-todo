import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { RootParamList } from '../navigation/RootNavigator';
import { RootScreens } from '../navigation/screens/Screens';

type Props = {
  todoId?: string;
};

const EditTodoButton = ({ todoId }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  function onPress() {
    navigation.navigate(RootScreens.EditTodo, { todoId });
  }

  return (
    <TouchableOpacity hitSlop={15} onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>
        {todoId === undefined ? 'New Todo' : 'Edit Todo'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 24,
    borderRadius: 4,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EditTodoButton;
