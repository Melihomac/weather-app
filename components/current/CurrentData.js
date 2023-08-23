import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableHighlight,
    Alert,
} from "react-native";

const CurrentData = () => {
    checkSwitch = (param) => {
        switch (param) {
            case 'fog':
                this.fog();
                break;
            case 'mostly_cloudy':
                this.cloud();
                break;
            case 'sunny':
                this.sunny();
                break;
            case 'rainy':
                this.rainy();
                break;
            default:
                Alert.alert(param);
        }
    }
    fog = () => {
        return (
            <Text>Hello this is Test Execution</Text>
        )
    }
    cloud = () => {
        Alert.alert("TWO");
    }
    sunny = () => {
        Alert.alert("THREE");
    }
    rainy = () => {
        Alert.alert("FOUR");
    }
    return (
        <View style={styles.container}>
            {checkSwitch('fog') ?
                fog()
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default CurrentData