
import React, { Fragment, Component } from "react";
import { boxedTree } from 'd3-mitch-tree';
import moment from 'moment';
import 'moment-timezone';
import esb from "elastic-builder";
import axios from "axios";
import 'd3-mitch-tree/dist/css/d3-mitch-tree-theme-default.min.css';
import 'd3-mitch-tree/dist/css/d3-mitch-tree.min.css';
import { Spin } from 'antd';

//027039
//141627

class DiagramTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodeEventIndex : null,
            loading : false,
            dataDummy: {
                "nomor" : "",
                "kode_kantor" : "",
                "tanggal_daftar" : "",
                "id": Math.floor(Math.random()*90000) + 10000,
                "name": this.props.kodeDok,
                "description": this.props.data.nomorDaftar+" / "+this.props.data.tanggalDaftar+"\n"+this.props.data.namaKantor,
                "children": []
            },
        }
    }

    componentDidMount() {
        let child = []
        if (this.props.childrenData != null){
            if (this.props.kodeDok == "BC 28" || this.props.kodeDok == "P3Bet"){
                for (var i = 0; i < this.props.childrenData.length; i++){
                    let data = {
                        "nomor" : this.props.childrenData[i].nomor_dokumen_dokasal,
                        "kode_kantor" : this.props.childrenData[i].kd_kantor_dokasal,
                        "tanggal_daftar" : moment(this.props.childrenData[i].tanggal_dokumen_dokasal, 'YYYY-MM-DD').format("YYYY-MM-DD"),
                        "id": Math.floor(Math.random()*90000) + 10000,
                        "name": this.props.childrenData[i].kode_jenis_dokumen_dokasal == "331" ? "P3Bet" : "BC "+this.props.childrenData[i].kode_jenis_dokumen_dokasal,
                        "description": this.props.childrenData[i].nomor_dokumen_dokasal+" / "+moment(this.props.childrenData[i].tanggal_dokumen_dokasal, 'YYYY-MM-DD').format("YYYY-MM-DD")+"\n"+this.props.childrenData[i].kd_kantor_dokasal,
                        "children": []
                    }
                    child.push(data)
                }
            } else {
                for (var i = 0; i < this.props.childrenData.length; i++){
                    let data = {
                        "nomor" : this.props.childrenData[i].nomor_daftar_dok_asal,
                        "kode_kantor" : this.props.childrenData[i].kode_kantor_bb,
                        "tanggal_daftar" : moment(this.props.childrenData[i].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD"),
                        "id": Math.floor(Math.random()*90000) + 10000,
                        "name": this.props.childrenData[i].kode_jenis_dok_asal == "331" ? "P3Bet" : "BC "+this.props.childrenData[i].kode_jenis_dok_asal,
                        "description": this.props.childrenData[i].nomor_daftar_dok_asal+" / "+moment(this.props.childrenData[i].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD")+"\n"+this.props.childrenData[i].kode_kantor_bb,
                        "children": []
                    }
                    child.push(data)
                }
            }
            this.state.dataDummy.children = child;
        }
        this.lacalDokumenAsal(this.getDataChildren)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.dataDummy != this.state.dataDummy){
            // console.log("this.state.dataDummy ", this.state.dataDummy)
        }
    }

    getDataChildren = async (id, nomor, kode_kantor, tanggal_daftar, children, name) => {
        try {
            console.log("children", children)
          if (children == undefined){
            console.log("name ", name)
            this.setState({ loading : true });
            var datas = [];

            if (name == "BC 25") {
                var requestBodyBc25 = esb.requestBodySearch()
                    .query(esb.boolQuery()
                    .must(esb.matchQuery('nomor_daftar.keyword', ''+nomor+''))
                    .must(esb.matchQuery('kode_kantor.keyword', ''+kode_kantor+''))
                    .must(esb.matchQuery('tanggal_daftar', ''+tanggal_daftar+''))
                );

                const objBc25 = {
                    "index" : '/citac_bc25-*/_search',
                    "param" : requestBodyBc25.toJSON()
                }

                const responseBc25 = await axios({
                    method: 'post',
                    url: process.env.REACT_APP_CITAC +'/elastic/query',
                    headers: { 
                    'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_CITAC, 
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":  "**",
                    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Length, Content-Type, Authorization, Accept',
                    'Access-Control-Allow-Credentials': 'true',
                    },
                    data: objBc25,
                })

                if (responseBc25.data.message == "success"){
                    console.log("=====> bc 25", responseBc25.data.data.hits.hits.length)
                    if(responseBc25.data.data.hits.hits.length == 0){
                        this.setState({loading : false});
                    } else {
                        if (responseBc25.data.data.hits.hits[0]._source.bahan_baku == undefined) {
                            this.setState({loading : false});
                        } else {
                            console.log("=====> bb bc 25", responseBc25.data.data.hits.hits[0]._source.bahan_baku.length)
                            for (let j = 0; j < responseBc25.data.data.hits.hits[0]._source.bahan_baku.length; j++){
                                var dataBc25 = {
                                    "nomor" : responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].nomor_daftar_dok_asal,
                                    "kode_kantor" : responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].kode_kantor_bb,
                                    "tanggal_daftar" : moment(responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD"),
                                    "id": Math.floor(Math.random()*90000) + 10000,
                                    "name": responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].kode_jenis_dok_asal == "331" ? "P3Bet" : "BC "+responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].kode_jenis_dok_asal,
                                    "description": responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].nomor_daftar_dok_asal+" / "+moment(responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD")+"\n"+responseBc25.data.data.hits.hits[0]._source.bahan_baku[j].kode_kantor_bb,
                                    "children": []
                                }
                                datas.push(dataBc25)
                            }
                            this.mySearch(id, this.state.dataDummy.children, datas);
                        }
                    }
                }
            } else if (name == "BC 27"){

                var requestBodyBc27 = esb.requestBodySearch()
                    .query(esb.boolQuery()
                    .must(esb.matchQuery('nomor_daftar.keyword', ''+nomor+''))
                    .must(esb.matchQuery('kode_kantor.keyword', ''+kode_kantor+''))
                    .must(esb.matchQuery('tanggal_daftar', ''+tanggal_daftar+''))
                );

                const objBc27 = {
                    "index" : '/citac_bc27-*/_search',
                    "param" : requestBodyBc27.toJSON()
                }

                const responseBc27 = await axios({
                    method: 'post',
                    url: process.env.REACT_APP_CITAC +'/elastic/query',
                    headers: { 
                    'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_CITAC, 
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":  "**",
                    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Length, Content-Type, Authorization, Accept',
                    'Access-Control-Allow-Credentials': 'true',
                    },
                    data: objBc27,
                })

                if (responseBc27.data.message == "success"){
                    console.log("=====> bc 27", responseBc27.data.data.hits.hits.length)
                    if(responseBc27.data.data.hits.hits.length == 0){
                        this.setState({loading : false});
                    } else {
                        if (responseBc27.data.data.hits.hits[0]._source.bahan_baku == undefined) {
                            this.setState({loading : false});
                        } else {
                            console.log("=====> bb bc 27", responseBc27.data.data.hits.hits[0]._source.bahan_baku.length)
                            for (let j = 0; j < responseBc27.data.data.hits.hits[0]._source.bahan_baku.length; j++){
                                var dataBc27 = {
                                    "nomor" : responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].nomor_daftar_dok_asal,
                                    "kode_kantor" : responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].kode_kantor_bb,
                                    "tanggal_daftar" : moment(responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD"),
                                    "id": Math.floor(Math.random()*90000) + 10000,
                                    "name": responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].kode_jenis_dok_asal == "331" ? "P3Bet" : "BC "+responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].kode_jenis_dok_asal,
                                    "description": responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].nomor_daftar_dok_asal+" / "+moment(responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD")+"\n"+responseBc27.data.data.hits.hits[0]._source.bahan_baku[j].kode_kantor_bb,
                                    "children": []
                                }
                                datas.push(dataBc27)
                            }
                            this.mySearch(id, this.state.dataDummy.children, datas);
                        }
                    }
                }

            } else if (name == "BC 28"){

                var requestBodyBc28 = esb.requestBodySearch()
                    .query(esb.boolQuery()
                    .must(esb.matchQuery('nomor_daftar.keyword', ''+nomor+''))
                    .must(esb.matchQuery('kode_kantor.keyword', ''+kode_kantor+''))
                    .must(esb.matchQuery('tanggal_daftar', ''+tanggal_daftar+''))
                );

                const objBc28 = {
                    "index" : '/citac_bc28-*/_search',
                    "param" : requestBodyBc28.toJSON()
                }

                const responseBc28 = await axios({
                    method: 'post',
                    url: process.env.REACT_APP_CITAC +'/elastic/query',
                    headers: { 
                    'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_CITAC, 
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":  "**",
                    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Length, Content-Type, Authorization, Accept',
                    'Access-Control-Allow-Credentials': 'true',
                    },
                    data: objBc28,
                })

                if (responseBc28.data.message == "success"){
                    console.log("=====> bc 28", responseBc28.data.data.hits.hits.length)
                    if(responseBc28.data.data.hits.hits.length == 0){
                        this.setState({loading : false});
                    } else {
                        if (responseBc28.data.data.hits.hits[0]._source.dokumen_asal == undefined) {
                            this.setState({loading : false});
                        } else {
                            console.log("=====> bb bc 28", responseBc28.data.data.hits.hits[0]._source.dokumen_asal.length)
                            for (let j = 0; j < responseBc28.data.data.hits.hits[0]._source.dokumen_asal.length; j++){
                                var dataBc28 = {
                                    "nomor" : responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].nomor_dokumen_dokasal,
                                    "kode_kantor" : responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].kd_kantor_dokasal,
                                    "tanggal_daftar" : moment(responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].tanggal_dokumen_dokasal, 'YYYY-MM-DD').format("YYYY-MM-DD"),
                                    "id": Math.floor(Math.random()*90000) + 10000,
                                    "name": responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].kode_jenis_dokumen_dokasal == "331" ? "P3Bet" : "BC "+responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].kode_jenis_dokumen_dokasal,
                                    "description": responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].nomor_dokumen_dokasal+" / "+moment(responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].tanggal_dokumen_dokasal, 'YYYY-MM-DD').format("YYYY-MM-DD")+"\n"+responseBc28.data.data.hits.hits[0]._source.dokumen_asal[j].kd_kantor_dokasal,
                                    "children": []
                                }
                                datas.push(dataBc28)
                            }
                            this.mySearch(id, this.state.dataDummy.children, datas);
                        }
                    }
                }

            } else if (name == "BC 41") {

                var requestBodyBc41 = esb.requestBodySearch()
                    .query(esb.boolQuery()
                    .must(esb.matchQuery('nomor_daftar.keyword', ''+nomor+''))
                    .must(esb.matchQuery('kode_kantor.keyword', ''+kode_kantor+''))
                    .must(esb.matchQuery('tanggal_daftar', ''+tanggal_daftar+''))
                );

                const objBc41 = {
                    "index" : '/citac_bc41-*/_search',
                    "param" : requestBodyBc41.toJSON()
                }
        
                const responseBc41 = await axios({
                    method: 'post',
                    url: process.env.REACT_APP_CITAC +'/elastic/query',
                    headers: { 
                    'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_CITAC, 
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":  "**",
                    'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Length, Content-Type, Authorization, Accept',
                    'Access-Control-Allow-Credentials': 'true',
                    },
                    data: objBc41,
                })
        
                if (responseBc41.data.message == "success"){
                    console.log("=====> bc 41", responseBc41.data.data.hits.hits.length)
                    if(responseBc41.data.data.hits.hits.length == 0){
                        this.setState({loading : false});
                    } else {
                        if (responseBc41.data.data.hits.hits[0]._source.bahan_baku == undefined) {
                            this.setState({loading : false});
                        } else {
                            console.log("=====> bb bc 41", responseBc41.data.data.hits.hits[0]._source.bahan_baku.length)
                            for (let j = 0; j < responseBc41.data.data.hits.hits[0]._source.bahan_baku.length; j++){
                                var dataBc41 = {
                                    "nomor" : responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].nomor_daftar_dok_asal,
                                    "kode_kantor" : responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].kode_kantor_bb,
                                    "tanggal_daftar" : moment(responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD"),
                                    "id": Math.floor(Math.random()*90000) + 10000,
                                    "name": responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].kode_jenis_dok_asal == "331" ? "P3Bet" : "BC "+responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].kode_jenis_dok_asal,
                                    "description": responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].nomor_daftar_dok_asal+" / "+moment(responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].tanggal_daftar_dok_asal, 'YYYY-MM-DD').format("YYYY-MM-DD")+"\n"+responseBc41.data.data.hits.hits[0]._source.bahan_baku[j].kode_kantor_bb,
                                    "children": []
                                }
                                datas.push(dataBc41)
                            }
                            this.mySearch(id, this.state.dataDummy.children, datas);
                        }
                    }
                }
            }
            this.setState({ loading : false });
          }
    
        } catch (error) {
            console.log(error);
        }
    };

    mySearch = (idSearch, data, newChild) => {
        for (let x in data) {
            if(data[x].id == idSearch){
                data[x].children = newChild
                this.setState({loading : false});
                this.lacalDokumenAsal(this.getDataChildren)
                console.log("Selamat penantian anda berakhir...", data[x])
                return data[x];
            }else{
                this.mySearch(idSearch, data[x]?.children, newChild, false);
            }
        }
    }

    lacalDokumenAsal = async (getDataChildren) => {
        try {
            new boxedTree()
                .setData(this.state.dataDummy)
                .setAllowFocus(false)
                .setAllowZoom(false)
                .setAllowNodeCentering(false)
                .setAllowPan(true)
                .setElement(document.getElementById(this.props.id))
                .setIdAccessor(function(data) {
                    return data.id;
                })
                .setChildrenAccessor(function(data) {
                return data.children;
                })
                .setBodyDisplayTextAccessor(function(data) {
                return data.description;
                })
                .setTitleDisplayTextAccessor(function(data) {
                return data.name;
                })
                .setOrientation('topToBottom')
                .getNodeSettings()
                .setSizingMode('nodeSize')
                .back()
                .setMargins({
                top: 0, 
                right: 0,
                bottom: 500,
                left: 0
                })
                .on("nodeClick", function(event) {
                //   console.log(event.nodeDataItem.data.childrenData);
                    if (event.type == 'focus'){
                    //   console.log("Node is being focused");
                    } else if (event.type == 'collapse'){
                    //   console.log("Node is collapsing");
                    } else if (event.type == 'expand'){
                        // console.log("Node is expanding");
                        console.log(event.nodeDataItem.data.children.length);
                        if(event.nodeDataItem.data.children.length == 0) {
                            // console.log("children ==> ", event.nodeDataItem.data.children)
                            getDataChildren(event.nodeDataItem.data.id, event.nodeDataItem.data.nomor, event.nodeDataItem.data.kode_kantor, event.nodeDataItem.data.tanggal_daftar, event.nodeDataItem.data.childrenData, event.nodeDataItem.data.name)
                        } 
                    }
                })
                .initialize();
        } catch (error) {
            console.log(error);
        }
    };

    render() {

        return (
            <Spin spinning={this.state.loading}>
                <div  style={{backgroundColor: "white"}}>
                    <div id={this.props.id}></div>
                </div>
            </Spin>
        )
    }

}

export default DiagramTree;

