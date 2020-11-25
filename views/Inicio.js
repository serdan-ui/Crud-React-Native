import React, {useEffect, useState} from 'react';
import {  FlatList, View } from 'react-native';
import axios from 'axios';
import { List, Headline, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {
const [ clientes, setClientes ] = useState([])
const [ consultarApi, setConsultarApi ] = useState(true)


    useEffect(() => {
        const obtenerClienteApi = async () => {
            try {
             const res = await axios.get('http://10.0.2.2:3000/clientes');
             setClientes(res.data); 
             setConsultarApi(false);
            } catch (error) {
                console.log(error)
            }
        }
        if (consultarApi) {
            obtenerClienteApi();
        }
    }, [consultarApi])
    return (
        <View style={globalStyles.contenedor}> 
            <Headline style={globalStyles.titulo}>{clientes.length > 0 ? 'Clientes' : 'No hay clientes'}</Headline>

            <FlatList
                data={clientes}
                keyExtractor= { cliente => (cliente.id).toString()}
                renderItem= {({ item }) => (
                    <List.Item
                        title={ item.nombre }
                        description= { item.empresa }
                        onPress={() => navigation.navigate('DetallesCliente',  { item, setConsultarApi })}
                    />
                )}
            />
            <FAB
                onPress={() => navigation.navigate('NuevoCliente', { setConsultarApi }) }
                icon="plus"
                style={globalStyles.fab}
            />
        </View>
    )
}

export default Inicio;