import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onCancel?: () => void;
  onConfirm?: () => void;
};

const ConfirmButtons = ({ onCancel, onConfirm }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onCancel}
        style={[styles.button, { backgroundColor: 'grey' }]}
      >
        <Text style={styles.buttonText}>{'Cancel'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onConfirm}
        style={[styles.button, { backgroundColor: 'blue' }]}
      >
        <Text style={styles.buttonText}>{'Confirm'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfirmButtons;
