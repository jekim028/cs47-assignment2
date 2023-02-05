// import { text } from '@fortawesome/fontawesome-svg-core';
import { View, ImageBackground, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Profiles from '../../assets/Profiles';
import Icons from '../../assets/Icons'
import { Themes } from '../../assets/Themes';

const { height, width } = Dimensions.get('window');

const Body = () => {
    return (
        <View source={styles.body}>
            <ImageBackground 
             source={Profiles.mtl.image} 
             style={[styles.image, Themes.light.shadows]}
             imageStyle={styles.imageStyle}
            >
                <Text style={[styles.text, styles.name]}>{Profiles.mtl.name}</Text>
                <Text style={[styles.text, styles.distance]}>{Profiles.mtl.caption}</Text>
            </ImageBackground>
            <View style={[styles.audioBar, Themes.light.shadows]}>
                <Text style={[styles.text, styles.hotTake]}>My hottest take</Text>
                <View style={styles.iconContainer}>
                    <Image source={Icons.player.light} style={[styles.icon, styles.playerIcon]} />
                    <Image source={Icons.audioWave.light} style={[styles.icon, styles.audioIcon]} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
    },
    audioBar: {
        marginTop: 25,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        backgroundColor: Themes.light.bgSecondary,
        borderRadius: 20,
    },
    hotTake: {
        fontSize: 32,
        marginLeft: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: 100,
        // marginTop: 40,
    },
    playerIcon: {
        width: width * 0.15,
        resizeMode: 'contain',
    },
    audioIcon: {
        width: width * 0.65,
        resizeMode: 'contain',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1 / 1.1,
        justifyContent: "space-between",
    },
    imageStyle: {
        borderRadius: 8,
    },
    text: {
        padding: 8,
        fontFamily: 'Sydney',
    },
    name: {
        fontSize: 32,
        color: "white",
    },
    distance: {
        fontSize: 18,
        color: "white",
    }
})

export default Body;