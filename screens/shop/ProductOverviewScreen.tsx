import React from 'react';
import {FlatList, ListRenderItemInfo} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Product} from "../../models/products";
import {ProductsNavigatorProps} from "../../navigation/types";
import ProductItem from "../../components/shop/ProductItem";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigationTypes";
import {addToCart} from "../../store/actions/cart";

type ProductsProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.ProductsOverview>;

const ProductOverviewScreen: React.FC<ProductsProps> = ({navigation, route}) => {

    const products: Product[] = useAppSelector(state => state.products.availableProducts);
    const dispatch = useAppDispatch();

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={(itemData: ListRenderItemInfo<Product>) =>
                (<ProductItem title={itemData.item.title}
                              imgSrc={itemData.item.imageUrl}
                              price={itemData.item.price}
                              onViewDetailPress={() => navigation.navigate(
                                  PRODUCTS_STACK_SCREENS.ProductsDetail as any, {
                                      productId: itemData.item.id,
                                      productTitle:itemData.item.title
                                  } as any
                              )}
                              onCartPress={() => dispatch(addToCart(itemData.item))}
                    />
                )
            }
        />
    );
};

export default ProductOverviewScreen;