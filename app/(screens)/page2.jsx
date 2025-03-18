import { View, Text, StyleSheet, } from 'react-native'
import React from 'react'

const page2 = () => {
  return (
    <View style={styles.container}> 
      <Text>Page 2</Text>
    </View>
  )
}


export default page2
const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
   },
  
});

