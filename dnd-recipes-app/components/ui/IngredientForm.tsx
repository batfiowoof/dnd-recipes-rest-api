import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import type { Ingredient } from "@/constants/schemas";

interface IngredientFormProps {
  ingredient?: Ingredient;
  onSubmit: (ingredient: Omit<Ingredient, "id">) => void;
  onCancel: () => void;
  error?: string;
}

export const IngredientForm: React.FC<IngredientFormProps> = ({
  ingredient,
  onSubmit,
  onCancel,
  error,
}) => {
  const [name, setName] = useState(ingredient?.name || "");
  const [amount, setAmount] = useState(ingredient?.amount || "");
  const [unit, setUnit] = useState(ingredient?.unit || "");
  const [nameError, setNameError] = useState<string>();
  const [amountError, setAmountError] = useState<string>();
  const [unitError, setUnitError] = useState<string>();

  const handleSubmit = () => {
    let hasError = false;

    if (!name) {
      setNameError("Името на съставката е задължително");
      hasError = true;
    } else {
      setNameError(undefined);
    }

    if (!amount) {
      setAmountError("Количеството е задължително");
      hasError = true;
    } else {
      setAmountError(undefined);
    }

    if (!unit) {
      setUnitError("Мерната единица е задължителна");
      hasError = true;
    } else {
      setUnitError(undefined);
    }

    if (hasError) return;

    onSubmit({
      name,
      amount,
      unit,
    });
  };

  return (
    <View style={styles.container}>
      {error && <ErrorMessage message={error} />}

      <Input
        label="Име на съставката"
        value={name}
        onChangeText={setName}
        error={nameError}
      />

      <Input
        label="Количество"
        value={amount}
        onChangeText={setAmount}
        error={amountError}
      />

      <Input
        label="Мерна единица"
        value={unit}
        onChangeText={setUnit}
        error={unitError}
      />

      <View style={styles.buttons}>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Отказ
        </Button>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          {ingredient ? "Запази" : "Добави"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
  },
});
