import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import CreateToDo from '../components/CreateToDo';
import LogOutModal from '../components/LogOutModal';
import ToDoList from '../components/ToDoList';

import { AuthContext, UserContext } from '../context/context';

import { ToDo } from '../interfaces/interfaces';
import NavBar from '../components/NavBar';

const MainScreen = () => {

    const toDosAPI = 'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod/todo';

    const { authToken, setAuthToken } = useContext(AuthContext);
    const { user, setUser } = useContext(UserContext);

    const [toDos, setToDos] = useState<Array<ToDo>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [newToDoName, setNewToDoName] = useState<string>('');
    const [showLogOut, setShowLogOut] = useState(false);

    const getToDos = async () => {
        setLoading(true);
        try{
            const response = await fetch(toDosAPI, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${authToken}`
                }
            });
            if (response.ok){
                const json = await response.json();
                setToDos(json);
            } else {
                throw Error(`Error ${response.status}`);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const putToDo = async () => {
        if(newToDoName.length > 0){
            try{
                const response = await fetch(toDosAPI, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        name: newToDoName
                    })
                });
                if (response.ok){
                    getToDos();
                    setNewToDoName('');
                } else {
                    throw Error(`Error ${response.status}`);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            Alert.alert('Please name your To Do', 'Name cannot be blank');
        }
    }

    const completeToDo = async (toDoId : number) => {
        try {
            const response = await fetch(toDosAPI + `-completed/${toDoId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${authToken}`
                }
            });
            if (response.ok) {
                getToDos();
                setNewToDoName('');
            } else {
                throw Error(`Error ${response.status}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteToDo = async (id: string) => {

        try {
            const response = await fetch(toDosAPI + `/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `bearer ${authToken}`
                }
            });
            if (response.ok) {
                getToDos();
                setNewToDoName('');
            } else {
                throw Error(`Error ${response.status}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const confirmDeleteToDo = (toDo: ToDo) => {
        Alert.alert('Delete', `Delete "${toDo.name}"?`, [
            {
                text: 'Cancel', 
                style:'cancel'
            }, {
                text: 'Delete', 
                onPress: () => deleteToDo(toDo.id)
            }
        ]);
    }

    const clearSession = () => {
        setUser(null);
        setAuthToken(null);
    }

    const confirmLogOut = () => {
        Alert.alert('Log Out', 'Are you sure you want to Log Out?', [
            {
                text: 'Cancel', 
                style:'cancel'
            }, {
                text: 'Log Out', 
                onPress: () => clearSession()
            }
        ]);
    }

    useEffect(() => {
        getToDos();
    }, []);

    if(isLoading){
        return (
        <View style={styles.container}>
            <NavBar setShowLogOut={setShowLogOut} />
            <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode='tail'
            >
                {`${user.name}'s To Do List`}
            </Text>
            <View style={styles.loadingContainer}>
                    <ActivityIndicator color='#FFFFFF' />
            </View>
        </View>
    )}

    return (
        <View style={styles.container}>
            <NavBar setShowLogOut={setShowLogOut} />
            <Text
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode='tail'
            >
                {`${user.name}'s To Do List`}
            </Text>
            <CreateToDo newToDoName={newToDoName} setNewToDoName={setNewToDoName} putToDo={putToDo} />
            <ToDoList toDos={toDos} completeToDo={completeToDo} confirmDeleteToDo={confirmDeleteToDo}/>
            {showLogOut &&
                <LogOutModal confirmLogOut={confirmLogOut} setShowLogOut={setShowLogOut} />
            }
        </View>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 30,
        marginHorizontal: 20,
        color: '#FFFFFF'
    },
    loadingContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    }
});
