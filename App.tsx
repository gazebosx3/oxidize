import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

/*


https://alcohol.iupui.edu/calculators/bac.html#:~:text=(Dose%20in%20grams%2F(Body,of%20%2D0.016%20BAC%20per%20hour.


Calculated using the Widmark Equation
(Dose in grams/(Body weight in grams x Distribution ratio "r"))x100 where r(male)=.68 r(female)=.55 and assuming an average constant rate of -0.016 BAC per hour.

"""
BAC (Blood Alcohol Content) calculator with Widmark factor

The goal of this program is to show the BAC calculation method with Widmark
factor. Be careful, this is not a real alcohol-meter. If you want to know your
exact BAC, buy an alcohol-sensor. However, there are different rules in
different countries about drinking and driving, please DO NOT DRIVE if you have
drunk alcohol.
After a party walk, call a cab, an Uber or use the public transport.
"""

alcohol_density = 0.789 # g/cm^3
widmark_factor = {"man": 0.7,
                  "woman": 0.6}

gender = input('Are you man or woman? ')
drink_volume = float(input('Volume of drink (dl): ')) # dl
alcohol_concentration = float(input('Alcohol concentration (V/V%): '))
body_weight = float(input('body weight (kg): '))

bac = drink_volume * alcohol_concentration * alcohol_density / body_weight / widmark_factor[gender] # g
print(bac)

------
Things you can do: 

Pages:
- Home page -- just a button that saays "start new session", make it easy
- Also "edit profile"
 - gender, body weight

- Session calendar -- can review old sessions, when you finish a session it gets logged here. You click on a date, it shows you the sessions on the date

- Session page 
- start drink session
 - select profile
- add drink
  - select from predetermined drinks: glass of wine, various cocktails, glass of liquer (?), 4% beer, 5% beer, 6% ber, 7% beer, 8% beer, 9% beer, 10% beer (honestly it should just be "whatever percent beer you want")
- edit drink
- remove drink
- check BAC
- end drink session



 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
