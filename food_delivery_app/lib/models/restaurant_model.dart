import 'package:equatable/equatable.dart';
import 'package:food_delivery_app/models/menu_item_model.dart';

class Restaurant extends Equatable {
  final int id;
  final String imageUrl;
  final String name;
  final List<String> tags;
  final List<MenuItem> menuItems;
  final int deliveryTime;
  final String priceCategory;
  final double deliveryFee;
  final double distance;

  Restaurant({
    required this.id,
    required this.imageUrl,
    required this.name,
    required this.tags,
    required this.menuItems,
    required this.deliveryTime,
    required this.priceCategory,
    required this.deliveryFee,
    required this.distance,
  });

  @override
  List<Object?> get props =>
      [id, imageUrl, name, tags, menuItems, deliveryTime, priceCategory, deliveryFee, distance];

  static List<Restaurant> restaurants = [
    Restaurant(
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        name: 'SS Fast Food',
        tags: MenuItem.menuItems.where((menuItem) => menuItem.restaurantId == 1).map((menuItem) => menuItem.category).toSet().toList(),
        menuItems: MenuItem.menuItems.where((menuItem) => menuItem.restaurantId == 1).toList(),
        deliveryTime: 30,
        priceCategory: '\$',
        deliveryFee: 2.99,
        distance: 0.1
    ),
    Restaurant(id: 2, imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', name: 'Sarpanch', tags: ['Indian', 'Asian', 'Ice Cream'], menuItems: MenuItem.menuItems.where((menuItem) => menuItem.restaurantId == 2).toList(), deliveryTime: 30, priceCategory: '\$', deliveryFee: 2.99, distance: 0.4),
    Restaurant(id: 3, imageUrl: 'https://images.unsplash.com/photo-1586999768265-24af89630739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', name: 'Grill Inn', tags: ['Italian', 'Fast Food',], menuItems: MenuItem.menuItems.where((menuItem) => menuItem.restaurantId == 3).toList(), deliveryTime: 30, priceCategory: '\$', deliveryFee: 2.99, distance: 0.1),
    Restaurant(id: 4, imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', name: 'Route 44 Cafe', tags: ['Italian', 'Pizza',], menuItems: MenuItem.menuItems.where((menuItem) => menuItem.restaurantId == 4).toList(), deliveryTime: 30, priceCategory: '\$', deliveryFee: 2.99, distance: 0.1),
  ];

}

