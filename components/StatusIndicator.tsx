import React from "react";
import { Text, StyleSheet } from "react-native";

interface StatusIndicatorProps {
  label: string;
  isActive: boolean;
  activeColor: string;
  inactiveColor?: string;
}

/**
 * A reusable status indicator component that shows a colored label
 * based on an active/inactive state
 */
export const StatusIndicator = ({
  label,
  isActive,
  activeColor,
  inactiveColor = "#666",
}: StatusIndicatorProps) => {
  return (
    <Text
      style={[
        styles.container,
        { backgroundColor: isActive ? activeColor : inactiveColor },
      ]}
    >
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    margin: 1,
    fontSize: 10,
    alignSelf: "stretch",
    textAlign: "center",
  },
});

export default StatusIndicator;
