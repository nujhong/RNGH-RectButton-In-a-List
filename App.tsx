import React from 'react';

import {
  Alert,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  SectionList,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {RectButton, GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto', 'Steak', 'Ribs'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const IssueScreen = () => {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <ListItem item={item} />}
      renderSectionHeader={({section}) => (
        <Text style={styles.header}>{section.title}</Text>
      )}
    />
  );
};

const SolutionScreen = () => {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <ListItem item={item} shouldActivateOnStart={true} />
      )}
      renderSectionHeader={({section}) => (
        <Text style={styles.header}>{section.title}</Text>
      )}
    />
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Issue"
            screenOptions={{
              header: ({navigation}) => (
                <View style={styles.nav}>
                  <Button
                    title="Issue"
                    onPress={() => navigation.navigate('Issue')}
                  />
                  <Button
                    title="Solution"
                    onPress={() => navigation.navigate('Solution')}
                  />
                </View>
              ),
            }}>
            <Stack.Screen name="Issue" component={IssueScreen} />
            <Stack.Screen name="Solution" component={SolutionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const ListItem = ({
  item,
  shouldActivateOnStart,
}: {
  item: string;
  shouldActivateOnStart?: boolean;
}) => {
  return (
    <RectButton
      shouldActivateOnStart={shouldActivateOnStart}
      onPress={() => {
        Alert.alert(item);
      }}>
      <View accessible accessibilityRole="button">
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      </View>
    </RectButton>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
  },
  item: {
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
