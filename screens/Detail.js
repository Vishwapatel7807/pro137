import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert,Image} from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            imagePath: "",
            url: `/name?name=${this.props.navigation.getParam("name_name")}`
        };
    }
    componentDidMount() {
        this.getDetails();
    }
    getDetails = () => {
        const { url } = this.state;
        axios.get(url)
            .then(response => {
                this.setDetails(response.data.data);
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    };
    setDetails = nameDetails => {
        const nameType = nameDetails.name_type;
        let imagePath = "";
        this.setState({
            details: nameDetails, imagePath: imagePath
        });
    };

    render() {
        const { details, imagePath } = this.state;
        if (details.specifications) {
            return (
                <View style={styles.container}>
                    <Image 
                        source={imagePath}
                        style={{ resizeMode: "contain", width: "100%" }} />
                        <View>
                            <Text style={styles.cardItem} >
                                {`Star_name : ${details.name}`}
                            </Text>
                            <Text style={styles.cardItem} >
                                {`Distance: ${details.dist}`}
                            </Text>
                            <Text style={styles.cardItem} >
                                {`Mass: ${details.mass}`}
                            </Text>
                            <Text style={styles.cardItem} >
                                {`Radius : ${details.radius}`}
                            </Text>
                        </View>
                        <View style={[styles.cardItem, { flexDirection: "column" }]}>
                            <Text>{details.specifications ? `Specifications : ` : ""}
                            </Text> {details.specifications.map((item, index) => (
                                <Text key={index.toString()}
                                    style={{ marginLeft: 50 }}>
                                    {item}
                                </Text>
                            ))} </View>                   
                </View>
            );
        } return null;


    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    cardItem: { marginBottom: 10 }
});