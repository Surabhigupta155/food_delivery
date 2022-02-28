import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:food_delivery_app/models/models.dart';
import 'package:food_delivery_app/screens/screens.dart';

class AppRouter {
  static Route onGenerateRoute(RouteSettings settings) {
    print('The Route is: ${settings.name}');

    switch(settings.name) {
      case '/':
        return SplashScreen.route();
      case HomeScreen.routeName:
        return HomeScreen.route();
      case IntroScreen.routeName:
        return IntroScreen.route();
      case LandingScreen.routeName:
        return LandingScreen.route();
      case LoginScreen.routeName:
        return LoginScreen.route();
      case ForgetPasswordScreen.routeName:
        return ForgetPasswordScreen.route();
      case SendOTPScreen.routeName:
        return SendOTPScreen.route();
      case NewPasswordScreen.routeName:
        return NewPasswordScreen.route();
      case SignupScreen.routeName:
        return SignupScreen.route();
      case LocationScreen.routeName:
        return LocationScreen.route();
      case BasketScreen.routeName:
        return BasketScreen.route();
      case EditBasketScreen.routeName:
        return EditBasketScreen.route();
      case CheckoutScreen.routeName:
        return CheckoutScreen.route();
      case DeliveryTimeScreen.routeName:
        return DeliveryTimeScreen.route();
      case FilterScreen.routeName:
        return FilterScreen.route();
      case RestaurantListingScreen.routeName:
        return RestaurantListingScreen.route(
          restaurants: settings.arguments as List<Restaurant>
        );
      case RestaurantDetailsScreen.routeName:
        return RestaurantDetailsScreen.route(
          restaurant: settings.arguments as Restaurant
        );
      case VoucherScreen.routeName:
        return VoucherScreen.route();
        //break;
      default:
        return _errorRoute();
    }
  }

  static Route _errorRoute() {
    return MaterialPageRoute(
      builder: (_) => Scaffold(appBar: AppBar(title: Text('error'),)),
      settings: RouteSettings(name: '/error'),
    );
  }
}