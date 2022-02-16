import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:food_delivery_app/widgets/location_search_box.dart';
//import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:food_delivery_app/widgets/gmap.dart';


class LocationScreen extends StatelessWidget {
  //const LocationScreen({Key? key}) : super(key: key);
  static const String routeName = '/location';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => LocationScreen(),
      settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text(
      //     'Location',
      //   ),
      // ),
      body: Stack(
        children: [
          Container(
            height: MediaQuery.of(context).size.height,
            width: double.infinity,
            child: Gmap(
              lat: 10,
              lng: 10,
            ),

          ),
          Positioned(
            top: 40,
            left: 20,
            right: 20,
            child: Row(
              children: [
                SvgPicture.asset(
                  'assets/logo.svg',
                  height: 50,
                ),
                SizedBox(
                  width: 10,
                ),
                Expanded(
                    child: LocationSearchBox(),
                ),
              ],
            ),
          ),
          Positioned(
            bottom: 50,
            left: 20,
            right: 20,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 70.0),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(primary: Theme.of(context).colorScheme.primary),
                child: Text('Save'),
                onPressed: () {},
              ),
            ),
          ),
        ],
      )
    );
  }
}


