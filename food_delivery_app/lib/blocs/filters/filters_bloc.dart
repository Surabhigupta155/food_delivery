import 'dart:async';
// import 'dart:html';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:food_delivery_app/models/models.dart';

// import 'package:meta/meta.dart';

part 'filters_event.dart';
part 'filters_state.dart';

class FiltersBloc extends Bloc<FiltersEvent, FiltersState> {
  FiltersBloc() : super(FiltersLoading()) {
    on<LoadFilter>(_onLoadFilter);
    on<UpdateCategoryFilter>(_onUpdateCategoryFilter);
    on<UpdatePriceFilter>(_onUpdatePriceFilter);
  }

  void _onLoadFilter(LoadFilter event, Emitter<FiltersState> emit) {
    emit(FiltersLoaded(
      filter: Filter(
        categoryFilters: CategoryFilter.filters,
        priceFilters: PriceFilter.filters,
      ),
    ),);
  }

  void _onUpdateCategoryFilter(UpdateCategoryFilter event,
      Emitter<FiltersState> emit) {
    final state = this.state;
    if (state is FiltersLoaded) {
      final List<CategoryFilter> updatedCategoryFilters = state.filter
          .categoryFilters.map((categoryFilter) {
        return categoryFilter.id == event.categoryFilter.id ? event
            .categoryFilter : categoryFilter;
      }).toList();
      emit(FiltersLoaded(
        filter: Filter(
          categoryFilters: updatedCategoryFilters,
          priceFilters: state.filter.priceFilters,
        ),
      ),);
    }
  }

  void _onUpdatePriceFilter(UpdatePriceFilter event,
      Emitter<FiltersState> emit) {
    final state = this.state;
    if (state is FiltersLoaded) {
      final List<PriceFilter> updatedPriceFilters = state.filter.priceFilters
          .map((priceFilter) {
        return priceFilter.id == event.priceFilter.id
            ? event.priceFilter
            : priceFilter;
      }).toList();
      emit(
        FiltersLoaded(
            filter: Filter(
              categoryFilters: state.filter.categoryFilters,
              priceFilters: updatedPriceFilters,
            )
        ),
      );
    }
  }
}
  // @override
  // Stream<FiltersState> mapEventToState(
  //     FiltersEvent event,
  //     ) async* {
  //   if(event is LoadFilter){
  //     yield* _mapFilterLoadToState();
  //   }
  //   if(event is  UpdateCategoryFilter) {
  //     yield* _mapCategoryFilterUpdatedToState(event, state);
  //   }
  //   if(event is  UpdatePriceFilter) {
  //     yield* _mapPriceFilterUpdatedToState(event, state);
  //   }
  // }

  // Stream<FiltersState> _mapFilterLoadToState() async* {
  //   yield FiltersLoaded(
  //     filter: Filter(
  //       categoryFilters:  CategoryFilter.filters,
  //       priceFilters:  PriceFilter.filters,
  //     )
  //   );
  //
  // }
  //
  // Stream<FiltersState> _mapCategoryFilterUpdatedToState(
  //     CategoryFilterUpdated event,
  //     FiltersState state,
  //     ) async* {
  //   if(state is FiltersLoaded) {
  //     final List<CategoryFilter> updatedCategoryFilters = state.filter.categoryFilters.map((categoryFilter) {
  //       return categoryFilter.id == event.categoryFilter.id ? event.categoryFilter : categoryFilter;
  //     }).toList();
  //
  //     yield FiltersLoaded(
  //         filter: Filter(
  //           categoryFilters:  updatedCategoryFilters,
  //           priceFilters:  state.filter.priceFilters,
  //         )
  //     );
  //
  //   }
  // }
  //
  // Stream<FiltersState> _mapPriceFilterUpdatedToState(
  //     PriceFilterUpdated event,
  //     FiltersState state,
  //     ) async* {
  //   if(state is FiltersLoaded) {
  //     final List<PriceFilter> updatedPriceFilters = state.filter.priceFilters.map((priceFilter) {
  //       return priceFilter.id == event.priceFilter.id ? event.priceFilter : priceFilter;
  //     }).toList();
  //
  //     yield FiltersLoaded(
  //         filter: Filter(
  //           categoryFilters:  state.filter.categoryFilters,
  //           priceFilters:   updatedPriceFilters,
  //         )
  //     );
  //
  //   }
  // }

