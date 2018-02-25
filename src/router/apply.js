import Apply from "../components/Apply";
import ItemList from "../components/ItemList";
import ItemDetail from "../components/ItemDetail";

export default {
  path: "/apply",
  name: "apply",
  component: Apply,
  children: [
    {
      path: "list",
      name: "itemList",
      component: ItemList,
      props: function(route) {
        return { o: route.query.o };
      }
    },
    {
      path: "detail/:item",
      name: "itemDetail",
      component: ItemDetail,
      props: true
    }
  ]
};
