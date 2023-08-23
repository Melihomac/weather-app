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
import CData from './components/current/CurrentData'
import dayjs from 'dayjs';

export default function App() {
  let image = { uri: 'https://e1.pxfuel.com/desktop-wallpaper/1000/717/desktop-wallpaper-5-rainy-day-rainy-weather-aesthetic.jpg' };
  const { data, isLoading, error } = useFetchCurrent("current", {
    query: {
      lat: "37.81021N",
      lon: "122.42282W",
      timezone: 'auto',
      language: 'en',
      units: 'auto'
    }
  })
  const { dataHourly } = useFetchHourly("hourly", {
    query: {
      lat: "37.81021N",
      lon: "122.42282W",
      timezone: 'auto',
      language: 'en',
      units: 'auto'
    }
  })
  const CelciusFormula = (data?.current?.temperature - 32) * 5 / 9
  let Celcius = Math.floor(CelciusFormula)
  let dataSummary = data?.current?.summary
  let dataHour = dataHourly?.hourly?.data?.[0]?.date
  let dataCelcius = dataHourly?.hourly?.data?.[0]?.temperature
  dataCelcius = (dataCelcius - 32) * 5 / 9
  dataCelcius = Math.floor(dataCelcius)
  const date = dayjs(dataHour)
  let dataFor = dataHourly?.hourly?.data?.[0]
  console.log(dataFor)
  switch (dataSummary) {
    case "Mostly cloudy":
      image = { uri: 'https://blogs.sap.com/wp-content/uploads/2015/07/cloudy_744190.png' }
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
  for (let index = 0; index < dataFor?.length; index++) {
    const element = array[index];
  }
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
            <Text style={styles.date}>{
              date.hour()
            }
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
