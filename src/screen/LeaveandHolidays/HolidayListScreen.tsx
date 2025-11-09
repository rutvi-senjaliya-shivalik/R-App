// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   LayoutAnimation,
//   Platform,
//   UIManager,
// } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { Dropdown } from 'react-native-element-dropdown';
// import { Container, HeaderComponent } from '../../components/common';
// import { holidaylistAction } from './Actions/HolidaysAction';

// // Enable layout animation for Android
// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const yearOptions = [
//   { label: '2024', value: '2024' },
//   { label: '2025', value: '2025' },
//   { label: '2026', value: '2026' },
// ];

// const getDayName = (dateString: string) => {
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const [day, month, year] = dateString.split('-');
//   const date = new Date(`${year}-${month}-${day}`);
//   return days[date.getDay()];
// };

// const HolidayListScreen = (props: any) => {
//   const dispatch = useDispatch() as any;

//   const [selectedYear, setSelectedYear] = useState('2025');
//   const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
//   const [holidayData, setHolidayData] = useState<any[]>([]);

//   const toggleMonth = (month: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpandedMonth(expandedMonth === month ? null : month);
//   };

//   useEffect(() => {
//     ApicallGetHolidaylist(selectedYear);
//   }, [selectedYear]); // ✅ whenever year changes, re-fetch data

//   const ApicallGetHolidaylist = async (year: string) => {
//     try {
//       const payload = { year }; // ✅ send year to API
//       const response = await dispatch(holidaylistAction(payload));

//       switch (response?.status == '200' ? 'success' : 'failure') {
//         case 'success':
//           const apiHolidays = response?.data?.message || [];
//           const filteredHolidays = apiHolidays.filter((item: any) =>
//             item.date.endsWith(year),
//           ); // ✅ filter by year if API returns all data

//           const groupedData = groupHolidaysByMonth(filteredHolidays);
//           setHolidayData(groupedData);
//           break;

//         default:
//           setHolidayData([]);
//           break;
//       }
//     } catch (error) {
//       console.log('🚨 Exception occurred:', error);
//       setHolidayData([]);
//     }
//   };

//   const groupHolidaysByMonth = (holidays: any[]) => {
//     const monthsMap: Record<string, any[]> = {};
//     holidays.forEach(item => {
//       const [day, month, year] = item.date.split('-');
//       const monthName = new Date(`${year}-${month}-${day}`).toLocaleString(
//         'default',
//         { month: 'long' },
//       );

//       if (!monthsMap[monthName]) {
//         monthsMap[monthName] = [];
//       }
//       monthsMap[monthName].push({
//         date: item.date,
//         name: item.name,
//       });
//     });

//     return Object.keys(monthsMap).map(month => ({
//       month,
//       holidays: monthsMap[month],
//     }));
//   };

//   return (
//     <Container>
//       <HeaderComponent
//         onPress={() => props.navigation.goBack()}
//         Title="Holidays"
//       />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         style={styles.scrollContainer}
//         contentContainerStyle={styles.contentContainer}
//       >
//         {/* Year Selector */}
//         <View style={styles.header}>
//           <Text style={styles.title}>Year</Text>
//           <Dropdown
//             style={styles.dropdown}
//             data={yearOptions}
//             value={selectedYear}
//             labelField="label"
//             valueField="value"
//             placeholder="Select Year"
//             onChange={item => setSelectedYear(item.value)} // ✅ updates state
//             selectedTextStyle={styles.dropdownText}
//           />
//         </View>

//         {/* Month Listing */}
//         {holidayData.map((monthItem: any, index: number) => (
//           <View key={index} style={styles.card}>
//             <TouchableOpacity
//               onPress={() => toggleMonth(monthItem.month)}
//               style={styles.monthHeader}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.monthText}>{monthItem.month}</Text>
//               <Text style={styles.toggleText}>
//                 {expandedMonth === monthItem.month ? 'Hide' : 'Show'}
//               </Text>
//             </TouchableOpacity>

//             {expandedMonth === monthItem.month && (
//               <View style={styles.holidayList}>
//                 {monthItem.holidays.map((holiday: any, idx: number) => (
//                   <View key={idx} style={styles.holidayItem}>
//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.holidayDate}>
//                         {holiday.date} ({getDayName(holiday.date)})
//                       </Text>
//                       <Text style={styles.holidayName}>{holiday.name}</Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         ))}

//         {holidayData.length === 0 && (
//           <Text style={styles.noDataText}>No holidays found</Text>
//         )}
//       </ScrollView>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   contentContainer: {
//     padding: 16,
//     paddingBottom: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#000000',
//     marginRight: 20,
//   },
//   dropdown: {
//     height: 40,
//     width: 110,
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#FFFFFF',
//   },
//   dropdownText: {
//     fontSize: 14,
//     color: '#000000',
//   },
//   card: {
//     backgroundColor: '#F7F7F7',
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   monthHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   monthText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000000',
//   },
//   toggleText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#555555',
//   },
//   holidayList: {
//     marginTop: 10,
//   },
//   holidayItem: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 12,
//     marginTop: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   holidayDate: {
//     fontSize: 14,
//     color: '#777777',
//   },
//   holidayName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#000000',
//     flexShrink: 1,
//     flexWrap: 'wrap',
//     marginTop: 4,
//   },
//   noDataText: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#888888',
//     marginTop: 20,
//   },
// });

// export default HolidayListScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { Container, HeaderComponent } from '../../components/common';
import { holidaylistAction } from './Actions/HolidaysAction';

// Enable layout animation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const yearOptions = [
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
  { label: '2026', value: '2026' },
];

const getDayName = (dateString: string) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [day, month, year] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  return days[date.getDay()];
};

const HolidayListScreen = (props: any) => {
  const dispatch = useDispatch() as any;

  const [selectedYear, setSelectedYear] = useState('2025');
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
  const [holidayData, setHolidayData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const toggleMonth = (month: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  useEffect(() => {
    ApicallGetHolidaylist(selectedYear);
  }, [selectedYear]);

  const ApicallGetHolidaylist = async (year: string) => {
    setLoading(true); // ✅ start loading
    try {
      const payload = { year };
      const response = await dispatch(holidaylistAction(payload));

      if (response?.status == '200') {
        const apiHolidays = response?.data?.message || [];
        const filteredHolidays = apiHolidays.filter((item: any) =>
          item.date.endsWith(year),
        );

        const groupedData = groupHolidaysByMonth(filteredHolidays);
        setHolidayData(groupedData);
      } else {
        setHolidayData([]);
      }
    } catch (error) {
      console.log('🚨 Exception occurred:', error);
      setHolidayData([]);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const groupHolidaysByMonth = (holidays: any[]) => {
    const monthsMap: Record<string, any[]> = {};
    holidays.forEach(item => {
      const [day, month, year] = item.date.split('-');
      const monthName = new Date(`${year}-${month}-${day}`).toLocaleString(
        'default',
        { month: 'long' },
      );

      if (!monthsMap[monthName]) monthsMap[monthName] = [];
      monthsMap[monthName].push({
        date: item.date,
        name: item.name,
      });
    });

    return Object.keys(monthsMap).map(month => ({
      month,
      holidays: monthsMap[month],
    }));
  };

  return (
    <Container>
      <HeaderComponent
        onPress={() => props.navigation.goBack()}
        Title="Holidays"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Year Selector */}
        <View style={styles.header}>
          <Text style={styles.title}>Year</Text>
          <Dropdown
            style={styles.dropdown}
            data={yearOptions}
            value={selectedYear}
            labelField="label"
            valueField="value"
            placeholder="Select Year"
            onChange={item => setSelectedYear(item.value)}
            selectedTextStyle={styles.dropdownText}
          />
        </View>

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator
            size="small"
            color="#000000"
            style={{ marginTop: 30 }}
          />
        )}

        {/* Month Listing */}
        {!loading &&
          holidayData.map((monthItem: any, index: number) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                onPress={() => toggleMonth(monthItem.month)}
                style={styles.monthHeader}
                activeOpacity={0.7}
              >
                <Text style={styles.monthText}>{monthItem.month}</Text>
                <Text style={styles.toggleText}>
                  {expandedMonth === monthItem.month ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>

              {expandedMonth === monthItem.month && (
                <View style={styles.holidayList}>
                  {monthItem.holidays.map((holiday: any, idx: number) => (
                    <View key={idx} style={styles.holidayItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.holidayDate}>
                          {holiday.date} ({getDayName(holiday.date)})
                        </Text>
                        <Text style={styles.holidayName}>{holiday.name}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

        {!loading && holidayData.length === 0 && (
          <Text style={styles.noDataText}>No holidays found</Text>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  contentContainer: { padding: 16, paddingBottom: 30 },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: '700', color: '#000', marginRight: 20 },
  dropdown: {
    height: 40,
    width: 110,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  dropdownText: { fontSize: 14, color: '#000' },
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: { fontSize: 16, fontWeight: '600', color: '#000' },
  toggleText: { fontSize: 14, fontWeight: '500', color: '#555' },
  holidayList: { marginTop: 10 },
  holidayItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  holidayDate: { fontSize: 14, color: '#777' },
  holidayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    flexShrink: 1,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
});

export default HolidayListScreen;
