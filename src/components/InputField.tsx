import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = TextInputProps & {
  title?: string;
};

const InputField = ({ title, multiline, ...rest }: Props) => {
  const multiLineStyle = multiline ? { minHeight: 120 } : {};

  return (
    <View style={styles.textInputContainer}>
      {title && <Text> {title} </Text>}
      <TextInput
        style={[styles.textInput, multiLineStyle]}
        {...rest}
        multiline={multiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, gap: 16 },
  textInputContainer: {
    gap: 4,
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});

export default InputField;
