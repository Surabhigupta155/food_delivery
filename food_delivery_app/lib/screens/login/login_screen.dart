import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  //const LoginScreen({Key? key}) : super(key: key);
  static const String routeName = '/login';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => LoginScreen(),
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
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30,),
            child: Column(
              children: [
                Text(
                  "Login",
                style: Theme.of(context).textTheme.headline1!.copyWith(
                color: Theme.of(context).colorScheme.primary),
                ),
                SizedBox(
                  height: 10,
                ),
                Text(
                  "Add your details to login",
                  style: Theme.of(context).textTheme.headline5,
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
                            hintText: 'Your email / mobile no.',
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
                            hintText: 'Password',
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
                      Navigator.of(context).pushReplacementNamed('/home');
                      //Navigator.pushNamed(context, '/login');
                    },
                    child: Text('Login'),
                  ),
                ),
                SizedBox(height: 30,),
                GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushReplacementNamed('/forget-password');
                    //Navigator.pushNamed(context, '/forget-password');
                  },
                  child: Text(
                    "Forget your password?",
                    style: Theme.of(context).textTheme.headline6,
                  ),
                ),
                SizedBox(height: 150,),
                GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushReplacementNamed('/signup');
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Don't have an account?",
                        style: Theme.of(context).textTheme.headline6,
                      ),
                      Text(
                        "Sign Up",
                        style: Theme.of(context).textTheme.headline5!.copyWith(
                            color: Theme.of(context).colorScheme.primary),
                      ),
                    ],
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
