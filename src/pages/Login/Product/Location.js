import React, { Component } from "react";
import { View } from "react-native";
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationArray: [],
            region: null
        }
    }


    componentDidMount() {
        this.getInitialState()
    }

    getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View>
               <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
            </View>
        );
    }
}
