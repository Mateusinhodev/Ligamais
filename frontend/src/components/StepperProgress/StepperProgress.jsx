import { Fragment } from "react";
import { View, Text } from "react-native";
import { styles } from "./StepperProgress.style.js";

function StepperProgress({ currentStep, labels }) {
    return (
        <View style={styles.container}>
            {labels.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber <= currentStep;
                const isLast = index === labels.length - 1;

                return (
                    <Fragment key={label}>
                        <View style={styles.item}>
                            <View style={[styles.circle, isActive && styles.circleActive]}>
                                <Text style={[styles.circleText, !isActive && styles.circleTextInactive]}>
                                    {stepNumber}
                                </Text>
                            </View>
                            <Text style={[styles.label, isActive && styles.labelActive]}>
                                {label}
                            </Text>
                        </View>

                        {!isLast && (
                            <View style={[styles.line, isActive && styles.lineActive]} />
                        )}
                    </Fragment>
                );
            })}
        </View>
    );
}

export default StepperProgress;