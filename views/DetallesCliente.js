import React from 'react';
import { View, Alert } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({navigation, route}) => {

    const { nombre, telefono, correo, empresa, id } = route.params.item;
    const { setConsultarApi } = route.params;

    const mostrarConfirmacion = () => {
        Alert.alert(
            '¿Desea elimiar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                {text:'Si Eliminar', onPress: () => eliminarContacto()},
                {text: 'Cancelar', style:'cancel'}
            ]
        )
    }

    const eliminarContacto = async () => {
        const url = `http://10.0.2.2:3000/clientes/${id}`
        try {
           await axios.delete(url)
        } catch (error) {
            console.log(error)
        }
        //redireccionar 
        navigation.navigate('Inicio');
        //recargar clientes
        setConsultarApi(true);
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={globalStyles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={globalStyles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
            <Text style={globalStyles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>

            <Button mode="contained" icon="cancel"
            style={globalStyles.boton}
            onPress={()=> mostrarConfirmacion() }
            >Eliminar Cliente</Button>
            <FAB
                onPress={() => navigation.navigate('NuevoCliente', { cliente: route.params.item, setConsultarApi }) }
                icon="pencil"
                style={globalStyles.fab}
            />
        </View>
    )
}

export default DetallesCliente;