
# funciones que deben ser llamadas en el componente
crearProveedor(){
    const prov = {
      cod_proveedor: 45871,
      nombre_proveedor: "Lenovo"
    };
    this.peticionService.createProveedor(prov).subscribe((nuevo) => {
      console.log(nuevo);
    });
  }

  mostrarProveedor(){
    this.peticionService.getProveedor(10002).subscribe(todo => {
      console.log(todo);
    });
  }

  mmodificarProveedor(){
    const prov = {
      cod_proveedor: 45871,
      nombre_proveedor: "Lenovo"
    };
    this.peticionService.updateproveedor(prov).subscribe((todo) => {
    console.log(todo);
    });
  }

  borrarProveedor(){
    this.peticionService.deleteProveedor(10002).subscribe(todo => {
      console.log(todo);
    });
  }

  # insertar un nuevo proveedor
  createProveedor(proveedor:Peticion){
    const path = this.api;
    return this.http.post(path, proveedor);
  }

  # modificar un proveedor
  updateproveedor(proveedor:Peticion){
    const path = `${this.api}/${proveedor.cod_proveedor}`;
    return this.http.put<Peticion>(path, proveedor);
  }

  # borrar un proveedor
  deleteProveedor(cod_proveedor:number){
    const path = `${this.api}/${cod_proveedor}`;
    return this.http.delete<Peticion>(path);
  }

  