import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_delivery_app/models/models.dart';

part 'voucher_event.dart';
part 'voucher_state.dart';

class VoucherBloc extends Bloc<VoucherEvent, VoucherState> {
  VoucherBloc() : super(VoucherLoading()) {
    on<LoadVouchers>(_onLoadVouchers);
    on<UpdateVouchers>(_onUpdateVouchers);
    on<SelectVouchers>(_onSelectVouchers);
  }

  void _onLoadVouchers(LoadVouchers event, Emitter<VoucherState> emit) {}

  void _onUpdateVouchers(UpdateVouchers event, Emitter<VoucherState> emit) {}

  void _onSelectVouchers(SelectVouchers event, Emitter<VoucherState> emit) {}

}

