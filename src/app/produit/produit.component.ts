import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {Produit} from '../shared/produit.model';
import {ProduitService} from './produit.service';
import {DataModel} from '../shared/data.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: Produit[];

  produitForm: FormGroup;

  produit: Produit = new Produit();

  produitsModel: DataModel[];

  constructor(private produitService:ProduitService, private fb: FormBuilder, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.produits = this.route.snapshot.data.produits;
    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      quantite: '',
      prixUnitaire: ''
    });

    this.produitsModel = [
      new DataModel('id','ID','number',true,[]),
      new DataModel('ref','Référence','string',false,[]),
      new DataModel('quantite','Quantité','number',false,[]),
      new DataModel('prixUnitaire','Prix Unitaire','number',false,[])
    ]
  }
  /*produits: Produit[];

  //variable pour le formulaire
  produitForm: FormGroup;
  operation:string='add';
  selectedProduit:Produit;
  constructor(private produitServie:ProduitService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createFrom();
  }

  ngOnInit() {
    this.initProduit();
    this.produits = this.route.snapshot.data.produits;
  }
  createFrom(){
    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      quantite: '',
      prixUnitaire: ''
    });
  }
  loadProduits(){
    this.produitServie.getAll().subscribe(
      data=>{this.produits = data},
      error=>{console.log("An error was occured.")},
      ()=>{console.log('loading produits was done')}
    );
  }
  addProduit(){
    const p = this.produitForm.value;
    this.produitServie.add(p).subscribe(
      res =>{
        this.initProduit();
        this.loadProduits();
      }
    );
  }
  updateProduit(){
    this.produitServie.update(this.selectedProduit).subscribe(
      res=>{
        this.initProduit();
        this.loadProduits();
      }
    )
  }
  initProduit(){
    this.selectedProduit = new Produit();
    this.createFrom();
  }
  deleteProduit(){
    this.produitServie.delete(this.selectedProduit.id).subscribe(
      res=>{
        this.selectedProduit = new Produit();
        this.loadProduits();
      }
    );
  }*/
}
