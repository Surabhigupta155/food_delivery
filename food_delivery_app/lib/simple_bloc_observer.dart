import 'package:flutter_bloc/flutter_bloc.dart';

class SimpleBlocObserver extends BlocObserver {
  @override
  void onEvent(Bloc bloc, Object? event) {
    super.onEvent(bloc, event);
    print('${bloc.runtimeType} $event');
  }

  // @override
  // void onCreate(BlocBase bloc) {
  //   super.onCreate(bloc);
  //   print('onCreate Bloc-- ${bloc.runtimeType}');
  // }

  // @override
  // void onChange(BlocBase bloc, Change change) {
  //   super.onChange(bloc, change);
  //   print('onChange Bloc type-- ${bloc.runtimeType}');
  //   print('onChange Bloc CurrentState-- ${change.currentState}');
  //   print('onChange Bloc NextState-- ${change.nextState}');
  // }

  // void onChange(Cubit cubit, Change change) {
  //   print('${cubit.runtimeType} $change');
  //   super.onChange(cubit, change);
  // }

  @override
  void onTransition(Bloc bloc, Transition transition) {

    super.onTransition(bloc, transition);
    print(transition);
  }

  @override
  void onError(BlocBase bloc, Object error, StackTrace stackTrace) {
    print('${bloc.runtimeType}, $error');
    super.onError(bloc, error, stackTrace);
  }

  // @override
  // void onClose(BlocBase bloc) {
  //   super.onClose(bloc);
  //   print('onClose Bloc-- ${bloc.runtimeType}');
  // }

  // void onError(Cubit cubit, Object error, StackTrace stackTrace) {
  //   print('${cubit.runtimeType} $error $stackTrace');
  //   super.onError(cubit, error, stackTrace);
  // }
}