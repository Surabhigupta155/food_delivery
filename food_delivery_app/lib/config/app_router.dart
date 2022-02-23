import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:food_delivery_app/models/models.dart';
import 'package:food_delivery_app/screens/screens.dart';

class AppRouter {
  static Route onGenerateRoute(RouteSettings settings) {
    print('The Route is: ${settings.name}');

    switch(settings.name) {
      case '/':
        return HomeScreen.route();
      case HomeScreen.routeName:
        return HomeScreen.route();
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