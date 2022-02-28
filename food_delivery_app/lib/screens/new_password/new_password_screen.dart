import 'package:flutter/material.dart';

class NewPasswordScreen extends StatelessWidget {
  //const NewPasswordScreen({Key? key}) : super(key: key);
  static const String routeName = '/new-password';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => NewPasswordScreen(),
      settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: SafeArea(
            child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 30,),
                child: Column(
                  children: [
                    Text(
                      "New Password",
                      style: Theme.of(context).textTheme.headline2!.copyWith(
                          color: Theme.of(context).colorScheme.primary),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Text(
                      "Create a new password",
                      style: Theme.of(context).textTheme.headline5,
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(
                      height: 30,
                    ),
                    Container(
                      width: double.infinity,
                      margin: const EdgeInsets.only(top: 10, bottom: 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(5.0),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(child: TextFormField(
                            decoration: InputDecoration(
                                hintText: 'New Password',
                                contentPadding: const EdgeInsets.all(10)
                            ),
                          ),),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Container(
                      width: double.infinity,
                      margin: const EdgeInsets.only(top: 10, bottom: 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(5.0),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(child: TextFormField(
                            decoration: InputDecoration(
                                hintText: 'Confirm Password',
                                contentPadding: const EdgeInsets.all(10)
                            ),
                          ),),
                        ],
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
                          Navigator.of(context).pushReplacementNamed('/landing');
                          //Navigator.pushNamed(context, '/login');
                        },
                        child: Text('Next'),
                      ),
                    ),
                  ],
                ),
            ),
          ),
      ),
    );
  }
}
