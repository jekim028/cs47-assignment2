import { StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native';
import Icons from '../../assets/Icons'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Header = () => {
    return (
        <View style={styles.header}>
            <Image source={Icons.menu.light} style={[styles.headerIcons, styles.menuIcon]} />
            <Text style={styles.title}>ensom</Text>
            <Image source={Icons.sun} style={[styles.headerIcons, styles.sunIcon]} />
        </View>
    )
};

const styles = StyleSheet.create( {
    headerIcons: {
        height: 30,
        width: 30,
    },
    sunIcon: {
        marginLeft: 'auto',
    },
    menuIcon: {
        marginRight: 'auto',
    },
    title: {
        fontFamily: 'Sydney-Bold',
        fontSize: 32,
    },
    header: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 41 : 54,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
})

export default Header;