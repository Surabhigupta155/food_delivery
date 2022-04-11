import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);
  static const String routeName = '/profile';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => ProfileScreen(),
      settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
        title: Text(
        'Profile',),),
        body: Stack(
        children: [
          Container(
            width: MediaQuery.of(context).size.width,
            height: MediaQuery.of(context).size.height,
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: Column(
                  children: [

                    SizedBox(
                      height: 20,
                    ),
                    Container(
                      height: 80,
                      width: 80,
                      child: Image.asset('assets/logo.png', fit: BoxFit.cover,),
                      // child: Image(image: AssetImage('assets/logo.png', ),
                      // fit: BoxFit.cover,)
                    ),
                  ],
                ),
              ),
            ),
          ),

        ],
      )
    );
  }
}
