import 'package:flutter/material.dart';

class LandingScreen extends StatelessWidget {
  //const LandingScreen({Key? key}) : super(key: key);
  static const String routeName = '/landing';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => LandingScreen(),
      settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: Stack(
          children: [
            // Align(
            //   alignment: Alignment.topCenter,
            //   child: Container(
            //     width: double.infinity,
            //     height: MediaQuery.of(context).size.height * 0.5,
            //     decoration: ShapeDecoration(
            //       color: Colors.green,
            //       shape: RoundedRectangleBorder(
            //         borderRadius: BorderRadius.circular(10),
            //       ),
            //     ),
            //   ),
            // ),
            Container(
                height: double.infinity,
                width: double.infinity,
                child: Image(
                  image: NetworkImage('https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'),
                  fit: BoxFit.fill,
                )
            ),
            Align(
              alignment: Alignment.center,
              child: Text(
                'Food Delivery',
                style: Theme.of(context).textTheme.headline1!.copyWith(color: Theme.of(context).colorScheme.primary),
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                width: double.infinity,
                height: MediaQuery.of(context).size.height * 0.3,
                padding: const EdgeInsets.symmetric(horizontal: 40),
                child: Column(
                  children: [
                    Flexible(child: Text(
                      'Welcome to the food conjuncture of IIT Jammu!',
                      style: Theme.of(context).textTheme.headline4,
                      textAlign: TextAlign.center,
                    )),
                    Spacer(flex: 3,),

                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).colorScheme.primary,
                          shape: RoundedRectangleBorder(),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 50,
                          ),
                        ),
                        onPressed: () {
                          //Navigator.of(context).pushReplacementNamed('/login');
                          Navigator.pushNamed(context, '/login');
                        },
                        child: Text('Login'),
                      ),
                    ),
                    SizedBox(height: 20,),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).colorScheme.primary,
                          shape: RoundedRectangleBorder(),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 50,
                          ),
                        ),
                        onPressed: () {
                          //Navigator.of(context).pushReplacementNamed('/signup');
                          Navigator.pushNamed(context, '/signup');
                        },
                        child: Text('Create an Account'),
                      ),
                    ),
                    Spacer(),
                    Spacer(),
                  ],
                ),
              ),
            ),

          ],
        ),),
    );
  }
}
