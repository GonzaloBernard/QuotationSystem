<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cotizacion MIP</title>
    <!-- Invoice styling -->
    <style>
      body {
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        text-align: center;
        color: #777;
      }

      body h1 {
        font-weight: 300;
        margin-bottom: 0px;
        padding-bottom: 0px;
        color: #000;
      }

      body h3 {
        font-weight: 300;
        margin-top: 10px;
        margin-bottom: 20px;
        font-style: italic;
        color: #555;
      }

      body a {
        color: #06f;
      }

      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
      }

      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        border-collapse: collapse;
      }

      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }

      .invoice-box table tr td:nth-child(2) {
        text-align: right;
      }

      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }

      .invoice-box table tr.information table td {
        padding-bottom: 40px;
      }

      .invoice-box table tr.heading td {
        color: #ccae76;
        background-color: #0E1A32;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }

      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
      }

      .invoice-box table tr.item.last td {
        border-bottom: none;
      }

      .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
        font-size: 30px;
        padding: 20px;
        color: #ccae76;
      }

      .item{
          font-size: 12px !important;
          color: #0E1A32;
      }

      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }

        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
        <table>
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <img src="" />
                  </td>
                </tr>
                <tr>
                  <td> Cotización #: {{ $cotizacion->id }}
                    <br /> Fecha: {{\Carbon\Carbon::create($cotizacion->created_at)->format('d/m/Y')}}
                    <br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="information">
            <td colspan="2">
              <table>
                <tr>
                  <td>
                    {{ $cliente }}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          @foreach($cotizacion->cotizacionProductos as $item)
          <tr class="item last">
            <td class="item">#{{ $item->producto_id }}  - {{ $item->producto->name }} - Cantidad: {{ $item->cantidad }} - Precio Unitario: $ {{ $item->monto_unitario}}- IVA {{ $item->producto->iva}} </td>

          </tr>
          @endforeach
          <tr class="total">
            <td></td>
            <td>Total: $</td>
          </tr>
        </table>
      </div>


  </body>
</html>
