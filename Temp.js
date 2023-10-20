import { View, Text, TouchableOpacity, Button,NativeModules,SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RewardedAd, TestIds, RewardedAdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Reward2 = () => {
  const [loaded, setLoaded] = useState(false);
  const [adReady, setAdReady] = useState(false);
  const [coin,setCoin]=useState(0)

  const handleclick=()=>{
    NativeModules.RNHello.addEvent("Salik","Mohali")
      rewarded.show();
      setAdReady(false);
  }
  const getCoin=async()=>{
    //COIN UPDATE
    try {
      const value = await AsyncStorage.getItem('val3')
      //console.log(value)
      if(value===null){
        setCoin("0")
      }else{
        
        setCoin(""+(value)+"")
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error")
    }
    //COIN UPDATE
  }
  useEffect(() => {
    

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      setAdReady(true);
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
       
      RewardedAdEventType.EARNED_REWARD,
      
      reward => {
        //console.log("object",RewardedAdEventType);
        //console.log('User earned reward of ', reward);
        NativeModules.RNHello.findEvents(async(res)=>{
            // setCoin(coin+parseInt(res))
            // console.log(coin+parseInt(res))
            try {
              const value = await AsyncStorage.getItem('val3')
              //console.log(value)
              if(value===null){
                const va1=await AsyncStorage.setItem('val3',""+(parseInt(res))+"")
                
                setCoin(""+(parseInt(res))+"")
              }else{
                const va1=await AsyncStorage.setItem('val3',""+(parseInt(value)+parseInt(res))+"")
                setCoin(""+(parseInt(value)+parseInt(res))+"")
              }
            } catch (error) {
              // Error retrieving data
              console.log("Error")
            }
            
        })
      },
    );

  rewarded.addAdEventListener('closed',()=>{
    //console.log("object")
    rewarded.load();
  })

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    //   unsubscribeClosed();
    };

    
  }, []);

  useEffect(()=>{
    getCoin()
  },[coin,setCoin])

  // No advert ready to show yet
  if (!adReady) {
    return null;
  }

  
  return (
    <SafeAreaView>
     <Text style={{textAlign:'center',marginTop:100,fontSize:30,fontWeight:'bold'}}>Coins -: {coin}</Text>
    <TouchableOpacity
      style={{
        width: '80%',
        height: 50,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={
        
        handleclick
        
      }
    >
      <Text>Show Rewarded Ad</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Reward2;
