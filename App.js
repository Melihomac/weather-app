import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  Image,
} from "react-native";
import useFetchCurrent from './hook/useFetchCurrent';
import useFetchHourly from './hook/useFetchHourly';
import dayjs from 'dayjs';

export default function App() {
  // Image for default value
  let image = { uri: 'https://e1.pxfuel.com/desktop-wallpaper/1000/717/desktop-wallpaper-5-rainy-day-rainy-weather-aesthetic.jpg' };
  // Istanbul Hour for current Date
  const IstanbulHour = new Date()
  // Converting hour Istanbul to LosAngeles
  const LosAngeles = IstanbulHour.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  // data, isLoading, error coming from useFetchCurrent and it has a query for LosAngeles. It has current values
  const { data, isLoading, error } = useFetchCurrent("current", {
    query: {
      lat: "37.81021N",
      lon: "122.42282W",
      timezone: 'auto',
      language: 'en',
      units: 'auto'
    }
  })
  // This data is for LosAngeles hourly from API
  const { dataHourly } = useFetchHourly("hourly", {
    query: {
      lat: "37.81021N",
      lon: "122.42282W",
      timezone: 'auto',
      language: 'en',
      units: 'auto'
    }
  })
  // Celcius formula for converting to the fahrenheit
  const CelciusFormula = (data?.current?.temperature - 32) * 5 / 9
  // Its converting to string for readable
  let Celcius = Math.floor(CelciusFormula)
  // API has an data for ex:"Sunny" or "Cloudy".
  let dataSummary = data?.current?.summary
  // API has an date for ex:"2023-12-1, 4:00:00"
  let dataHour = dataHourly?.hourly?.data?.[0]?.date
  // API has an celcius for ex:"15"
  let dataCelcius = dataHourly?.hourly?.data?.[0]?.temperature
  // Celcius formula for converting to the fahrenheit
  dataCelcius = (dataCelcius - 32) * 5 / 9
  // Its converting to string for readable
  dataCelcius = Math.floor(dataCelcius)
  // dayjs library for using local time
  const date = dayjs(dataHour)
  //let dataFor = dataHourly?.hourly?.data?.[0]
  // Split is for converting data and to get only hour value
  let LosAngelesBefore = LosAngeles.split(':')[0]
  // switch for changing weather value (dataSummary) 
  switch (dataSummary) {
    case "Mostly cloudy":
      image = { uri: 'https://blogs.sap.com/wp-content/uploads/2015/07/cloudy_744190.png' }
      break;
    case "Partly clear":
      image = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2xQLRTr09-Fcjn2tXmj0IOEVqObe7-9h_Sh5Bqt5h7aiQjsZpvPCymvw9-F-3SOhq9E&usqp=CAU' }
      break;
    case "Partly sunny":
      image = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2xQLRTr09-Fcjn2tXmj0IOEVqObe7-9h_Sh5Bqt5h7aiQjsZpvPCymvw9-F-3SOhq9E&usqp=CAU' }
      break;
    case "Sunny":
      image = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2xQLRTr09-Fcjn2tXmj0IOEVqObe7-9h_Sh5Bqt5h7aiQjsZpvPCymvw9-F-3SOhq9E&usqp=CAU' }
      break;
    case "Fog":
      image = { uri: 'https://www.tdinsurance.com/products-services/home-insurance/tips-advice/fog-preparedness/_jcr_content/root/container/responsivegrid_right/container_1164102385/image.coreimg.50.640.jpeg/1672773285808/severeweathereventsarticle-fog-en.jpeg' }
      break;
    case 'Rainy':
      image = { uri: 'https://e1.pxfuel.com/desktop-wallpaper/1000/717/desktop-wallpaper-5-rainy-day-rainy-weather-aesthetic.jpg' }
      break;
    default:
      image = { uri: null }
  }

  // let dateFor = date.hour()
  // let hourFor
  // for (let index = 0; index < dateFor; index++) {
  //   console.log(index)
  // }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image}
          style={styles.image}>
          <Text style={styles.timeZone}>
            {data?.timezone}
          </Text>
          <Text style={styles.celcius}>
            {Celcius}°
          </Text>
          <Text style={styles.summary}>
            {data?.current?.summary}
          </Text>
          <View style={styles.hourlyContainer}>
            <Text style={styles.date}>
              {date.hour() == LosAngelesBefore.slice(-1) ? <Text>Now</Text> : date.hour()}
            </Text>
            <Text style={styles.temperatureHour}>
              {dataCelcius}°
            </Text>
          </View>
        </ImageBackground>
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  celcius: {
    fontSize: 70,
    paddingVertical: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#f5f5f5",
  },
  timeZone: {
    marginTop: 30,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: "#151B54"
  },
  summary: {
    paddingVertical: 8,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: "#151B54"
  },
  hourlyContainer: {
    borderColor: "#151B54",
    borderWidth: 5,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
  },
  date: {
    fontSize: 15,
    color: "#f5f5f5",
    fontWeight: "bold",
    marginBottom: 30
  },
  temperatureHour: {
    fontSize: 15,
    color: "#f5f5f5",
    fontWeight: "bold",
  }
});
