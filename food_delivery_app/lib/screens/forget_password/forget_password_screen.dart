import 'package:flutter/material.dart';

class ForgetPasswordScreen extends StatelessWidget {
  //const ForgetPasswordScreen({Key? key}) : super(key: key);
  static const String routeName = '/forget-password';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => ForgetPasswordScreen(),
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
          child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 30,),
              child: Column(
                children: [
                  Text(
                    "Reset Password",
                    style: Theme.of(context).textTheme.headline2!.copyWith(
                        color: Theme.of(context).colorScheme.primary),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  Text(
                    "Please enter your registered mobile no. to receive an OTP to create a new password",
                    style: Theme.of(context).textTheme.headline5,
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(
                    height: 50,
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
                              hintText: 'Registered Mobile No.',
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
                        Navigator.of(context).pushReplacementNamed('/send-OTP');
                        //Navigator.pushNamed(context, '/send-OTP');
                      },
                      child: Text('Send'),
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
