import React from 'react';
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet, Image
} from '@react-pdf/renderer';
import LogoImagen from "./logoDrive.png"
import { yellow } from '@mui/material/colors';


const stylesHeader = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espacio entre elementos
    marginBottom: 20,
    alignItems: 'center', // Alineamos verticalmente los elementos en el centro
  },
  square: {
    width: 100,
    height: 105, // Ajustamos el alto para que sea de 105
    backgroundColor: 'lightgray',
    border: 2,
    borderColor: 'black',
   
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  address: {
    marginLeft: 10, // Añadimos un margen a la derecha para separar el texto del cuadro
    //flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center', 
  },
  addressLine: {
    marginBottom: 5, // Ajustamos el margen inferior de cada línea
    fontSize: 11, // Ajustamos el tamaño de fuente para que no se corte el texto
  },
  infoBox: {
    border: 1,
    borderColor: 'black',
    marginBottom: 10,
    padding: 5,
    width: '25%',
    height: '60%',
    textAlign: 'center',
  },

  infoBoxText: {
    fontSize: 10,
    paddingBottom: 6
  },
  empresaHeader: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 700,
  },
  textHeader: {
    marginBottom: 5,
    fontSize: 10,
  },
  textDireccion: {
    marginBottom: 5,
    fontSize: 9,
  },

  size2: {
    fontSize: 15,
  },


})
const Header = ({ ObjetoData }) => {
  return (
    <View style={stylesHeader.header}>
      <View style={stylesHeader.square}>
        <Image src={LogoImagen} style={stylesHeader.logo} />
      </View>
      <View style={stylesHeader.address}>
        <Text style={stylesHeader.empresaHeader} >{ObjetoData.empresa}</Text>
        <Text style={stylesHeader.textHeader} >{ObjetoData.slogan}</Text>
        <Text style={stylesHeader.textHeader} >{ObjetoData.pagina}</Text>
        <Text style={stylesHeader.textDireccion} >{ObjetoData.direccion}</Text>
      </View>
      <View style={stylesHeader.infoBox}>
        <Text style={stylesHeader.infoBoxText}>{ObjetoData.ruc}</Text>
        <Text style={stylesHeader.infoBoxText}>{ObjetoData.documento}</Text>
        <Text style={stylesHeader.infoBoxText}>{ObjetoData.nroDocumento}</Text>
      </View>
    </View>
  );
};



export const DocumentoVentaPdf = ({ ObjetoData }) => {
 


  return (
    <>
    <PDFViewerComponent ObjetoData={ObjetoData} />
    {/* <PDFDownloadComponent ObjetoData={Objs} /> */}
      
    </>
  );
};



const Objs = {
  cliente: "76659655-MARCOS BARRIENTOS",
  empresa: "SUPER DRIVE EMPRESA",
  slogan: "LOS MEJORES REPUESTOS",
  pagina: "www.superdriveperu.com",
  direccion: "AV XXXXXX JR XXXX LAS PALMERAS 321",
  ruc: "R.U.C. 20543886671",
  clienteRuc: "20125498671",
  tipoDocumento: "PASAPORTE",
  moneda: "SOLES",
  documento: "COTIZACION",
  docVentaDets: "[{\"codDocVentaDet\":76,\"codDocVenta\":74,\"cantidad\":8.000000,\"precio\":350.000000,\"importe\":2800.000000000000,\"descripcion\":\"Llantas Hankook\",\"codigoAlternativo\":\"A00006\",\"codigoProducto\":\"GGRT2\",\"codProducto\":6,\"marca\":\"HINO\",\"codTipoProducto\":1},{\"codDocVentaDet\":77,\"codDocVenta\":74,\"cantidad\":10.000000,\"precio\":250.000000,\"importe\":2500.000000000000,\"descripcion\":\"rines\",\"codigoAlternativo\":\"A00009\",\"codigoProducto\":\"R44GF1\",\"codProducto\":9,\"marca\":\"VOLDSWAGEN\",\"codTipoProducto\":1}]",
  emision: "19/07/2023",
  editadoPor: "Miguel Flores",
  estado: "PENDIENTE",
  formaPago: "CREDITO",
  igv: 954,
  nroDocumento: "0001-00000001",
  cliente: "MARCOS BARRIENTOS",
  serieDoc: "0001",
  subTotal: 5300,
  total: 6254,
  usuario: "Miguel Flores"
}


const stylesHS = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    border: 1,
    borderColor: 'black',
    marginBottom: 10,
    padding: 5,
  },
  column: {
    width: '33.33%',
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  column2: {
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },

  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
  },

});

const HeaderSecundario = ({ ObjetoData }) => {
  return (
    <View style={stylesHS.page} >
      <View style={stylesHS.column}>
        <Text style={stylesHS.label}>Emision: {ObjetoData.emision}</Text>
        
        <Text style={stylesHS.label}>Doc: {ObjetoData.clienteRuc}</Text>
      </View>
      <View style={stylesHS.column}>
        <Text style={stylesHS.label}>Vendedor: {ObjetoData.formaPago}</Text>
        <Text style={stylesHS.label}></Text>
        <Text style={stylesHS.label}>Moneda: {ObjetoData.moneda}</Text>
      </View>
      {ObjetoData.tipoDocumento ?
      <View style={stylesHS.column}>
      <Text style={stylesHS.label}>Tipo Doc: {ObjetoData.tipoDocumento}</Text>
      </View> : <View></View>}

      <View style={stylesHS.column2}>
        <Text style={stylesHS.label}>Condicion Pago: {ObjetoData.formaPago}</Text>
        <Text style={stylesHS.label}></Text>
        <Text style={stylesHS.label}>Cliente: {ObjetoData.cliente}</Text>
      </View>

    

      

    </View>



  );
};






const stylesFooter = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',

    //padding: 10,
    //border: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10
  },
  column: {
    marginBottom: 10,
    padding: 5,
    borderColor: 'black',
    border: 1

  },

  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5
  },

});

const Footer = ({ ObjetoData }) => {
  return (
    <View style={stylesFooter.container} >
      
      <View style={stylesFooter.column} >
        <Text style={stylesFooter.label}>SubTotal: {ObjetoData.subTotal}</Text>
        <Text style={stylesFooter.label}>IGV: {ObjetoData.igv}</Text>
        <Text style={stylesFooter.label}>Total: {ObjetoData.total}</Text>
      </View>
      

    </View>
  );
};









const stylesTable = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
    height: '100%'
  },

  pagepdfdriver: {
    flexDirection: 'row',
    // backgroundColor: '#E4E4E4',
    padding: 30,
    flex: 1
  },

  page: {
    flexDirection: 'row',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    //paddingTop: '5rem',
    display: 'table',
    width: '100%',
    // borderStyle: 'solid',
    //  borderWidth: 1,
    //  borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: '33.33%', // Establecemos un ancho fijo para cada celda de la tabla
    fontSize: 12,
    padding: 5,
    //  borderStyle: 'solid',
    borderWidth: 1,
    // borderColor: '#000',
  },
  tableHeader: {
    // backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
  },
  descripcionCell: {
    width: '80%', // Puedes ajustar este valor según tus necesidades
  },



});


const TableReport = ({ ObjetoData }) => {

  return (
    ObjetoData ?
      <View style={stylesTable.page}>
        <View style={stylesTable.section}>
          <Header ObjetoData={ObjetoData} />
          <HeaderSecundario ObjetoData={ObjetoData} />

          {/* <Text>PRODUCTOS</Text> */}
          <View style={stylesTable.table}>

            <View style={stylesTable.tableRow}>
              <View style={[stylesTable.tableCell, stylesTable.tableHeader]}>
                <Text>CODIGO</Text>
              </View>
              <View style={[stylesTable.tableCell, stylesTable.tableHeader, stylesTable.descripcionCell]}>
                <Text>PRODUCTO</Text>
              </View>
              <View style={[stylesTable.tableCell, stylesTable.tableHeader]}>
                <Text>CANT</Text>
              </View>
              <View style={[stylesTable.tableCell, stylesTable.tableHeader]}>
                <Text>PRECIO</Text>
              </View>
              <View style={[stylesTable.tableCell, stylesTable.tableHeader]}>
                <Text>IMPORTE</Text>
              </View>
            </View>
            {JSON.parse(ObjetoData.docVentaDets) ?
              JSON.parse(ObjetoData.docVentaDets)?.map((item) =>

                <View key={item.codDocVentaDet} style={stylesTable.tableRow}>
                  <View style={stylesTable.tableCell}>
                    <Text>{item.codigoAlternativo}</Text>
                  </View>
                  <View style={[stylesTable.tableCell, stylesTable.descripcionCell]}>
                    <Text>{item.descripcion}</Text>
                  </View>
                  <View style={stylesTable.tableCell}>
                    <Text>{item.cantidad}</Text>
                  </View>
                  <View style={stylesTable.tableCell}>
                    <Text>{item.precio}</Text>
                  </View>
                  <View style={stylesTable.tableCell}>
                    <Text>{item.importe}</Text>
                  </View>
                </View>) : <View></View>}
          </View>
          <Footer ObjetoData={ObjetoData} />
        </View>

      </View> : <View> </View>
  );
};


const stylesView = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
    height: '100%'
  },

  pagepdfdriver: {
    flexDirection: 'row',
    // backgroundColor: '#E4E4E4',
    padding: 30,
    flex: 1
  },

})

function PDFViewerComponent({ ObjetoData }) {

  return (
    <view style={stylesView.container}>
      <PDFViewer style={stylesView.container} width="70%" height="150%">
        <Document>
          <Page size="A4" style={stylesView.pagepdfdriver}>
            <TableReport ObjetoData={ObjetoData} />
          </Page>
        </Document>
      </PDFViewer>
    </view>
  );
};

function PDFDownloadComponent({ ObjetoData }) {
  return (
    <div>
      <PDFDownloadLink
        document={<Document><Page><TableReport ObjetoData={ObjetoData} /></Page></Document>}
        fileName="informe.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando...' : 'Descargar Informe'
        }
      </PDFDownloadLink>
    </div>
  );
};
