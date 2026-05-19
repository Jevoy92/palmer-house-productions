interface ZohoCommerceEmbedProps {
  embedId: string;
  productId: string;
  handle: string;
  className?: string;
}

export const ZohoCommerceEmbed = ({ embedId, productId, handle, className = "" }: ZohoCommerceEmbedProps) => {
  const scriptContent = `
    !function(){
      var d="https://",
          e="${embedId}",
          n=window,
          o=document.createElement("script");
      o.async=!0,
      o.src="https://ecommerce-stratus.zohostratus.com/IDC/js/zs-buy-button.js",
      o.onload=function(){
        var d=document.querySelector('[data-embed-id="'+e+'"]');
        d&&n.zsBuyButton.init(d,t)
      },
      document.body.append(o);
      var t={
        api_domain:d,
        store:d,
        type:"product",
        embedId:"${productId}",
        handle:"${handle}",
        model:{
          "button_border_radius_enable":false,
          "button_size":"md",
          "product_box_enable":false,
          "product_box_border_radius_enable":false,
          "product_layout":"01",
          "show_product_images":true,
          "show_quantity":true,
          "styles":{
            "color_border_prod_variant_label":"#DCE0E8",
            "color_border_quantity_field":"#DCE0E8",
            "color_buynow_button":"#fff",
            "color_buynow_button_bg":"#00CA96",
            "color_prod_box_bg":"#fff",
            "color_prod_box_border":"#000",
            "color_prod_name":"#000",
            "color_prod_price":"#000",
            "color_prod_variant_label":"#000",
            "font_family_buynow_button":"Inter,sans-serif",
            "font_family_prod_name":"Inter,sans-serif",
            "font_family_prod_price":"Inter,sans-serif",
            "font_family_prod_variant_label":"Inter,sans-serif",
            "font_transform_buynow_button":"none",
            "font_transform_prod_name":"none",
            "font_transform_prod_price":"none",
            "font_transform_prod_variant_label":"none",
            "font_weight_buynow_button":"400",
            "font_weight_prod_name":"400",
            "font_weight_prod_price":"400",
            "font_weight_prod_variant_label":"400"
          },
          "size_styles":{
            "size_prod_box_border_radius":"5",
            "size_prod_box_border_width":"1",
            "font_size_prod_name":"15",
            "font_size_prod_price":"15",
            "font_size_prod_variant_label":"15",
            "border_radius_buynow_button":"1",
            "font_size_buynow_button":"15"
          },
          "variant_id":"",
          "id":"${productId}",
          "type":"product",
          "url":"${handle}",
          "variant_count":"1"
        }
      }
    }();
  `;

  return (
    <div className={`zoho-commerce-embed ${className}`}>
      <div data-embed-id={embedId}></div>
      <script 
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: scriptContent }}
      />
    </div>
  );
};