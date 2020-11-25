import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

    const { setConsultarApi } = route.params


    const [nombre, setNombre ] = useState(''); 
    const [telefono, setTelefono ] = useState(''); 
    const [correo, setCorreo ] = useState(''); 
    const [empresa, setEmpresa ] = useState(''); 
    const [alerta, setAlerta ] = useState(false);

    //detectar si estamos editando 
    useEffect(() => {
      if (route.params.cliente) {
        const { nombre, telefono, correo, empresa } = route.params.cliente;

        setCorreo(correo)
        setNombre(nombre)
        setTelefono(telefono)
        setEmpresa(empresa)
        
      }else{

      }
     
    }, [])


    const guardarCliente = async() => {
        //validar
        if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
            setAlerta(true)
            return;
        }
        //generar cliente
         const cliente = { nombre, telefono, correo, empresa}
        
        // si estamos editando o creadno nuevo cliente
        if (route.params.cliente) {
          //editando
          const { id } = route.params.cliente;
          cliente.id = id;
          const url = `http://10.0.2.2:3000/clientes/${id}`
          try {
            //actualizo el cliente
            await axios.put(url, cliente);
          } catch (error) {
            console.log(error)
          }
        }else{


          //guardar cliente en api
      try {
        if (Platform.OS === "ios") {
          //para ios url 
           await axios.post('http://localhost:3000/clientes', cliente)

        }else {
          //para android url 
           await axios.post('http://10.0.2.2:3000/clientes', cliente)
        } 

      } catch (error) {
        console.log(error)
      }
        }
        //redireccionar
        navigation.navigate('Inicio');
        //limpiar el form
        setTelefono('');
        setCorreo('');
        setEmpresa('');
        setNombre('');

        //guardar consultar api a true 
        setConsultarApi(true);
    }

    return (
        <View style= {globalStyles.contenedor}>
            <Headline style= { globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
            <TextInput
              label='Nombre'
              placeholder='Sergio'
              onChangeText= {(texto) => setNombre(texto)}
              style={styles.input}
              value={nombre}
            />
            <TextInput
              label='Telefono'
              style={styles.input}
              placeholder='12345678'
              onChangeText= {(texto) => setTelefono(texto)}
              value={telefono}
            />
            <TextInput
              label='Correo'
              style={styles.input}
              placeholder='correo@correo.com'
              onChangeText= {(texto) => setCorreo(texto)}
              value={correo}
            />
            <TextInput
              label='Empresa'
              style={styles.input}
              placeholder='Nombre Empresa'
              onChangeText= {(texto) => setEmpresa(texto)}
              value={empresa}
            />
            <Button
              icon='pencil-circle'
              mode='contained'
              onPress={() => guardarCliente()}
            >
                Guardar Cliente
            </Button>
            <Portal>
                <Dialog
                  visible={alerta}
                  onDismiss={ () => setAlerta(false)}
                >
                    <Dialog.Title>
                        Error
                    </Dialog.Title>
                    <Dialog.Content>
                      <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=> setAlerta(false)}>
                            OK
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;