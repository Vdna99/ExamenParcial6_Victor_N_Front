import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STask, TaskM } from '../service/s-task';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  

  NewTask: TaskM = {

    
    title: '',
    description: '',
    dateLimit: '',
    state: 'Pendiente'

  };



  constructor(private ServiceTask: STask) {

  }


  isEditing = false;


  card: any

  ngOnInit(): void {

    this.ServiceTask.getTasks().subscribe((data: any) => {
      console.log(data);
      this.card = data;
    })

  }

  SaveTask() {
    if (this.isEditing) {
      this.ServiceTask.UpdateTask(this.NewTask.id!,this.NewTask).subscribe({
        next: () => {
          console.log('Tarea actualizada');
          this.NewTask = { title: '', description: '', dateLimit: '', state: 'Pendiente' };
          this.isEditing = false;
          this.ngOnInit();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.ServiceTask.CreateTask(this.NewTask).subscribe({
        next: () => {
          console.log('Tarea creada');
          this.NewTask = { title: '', description: '', dateLimit: '', state: 'Pendiente' };
          this.ngOnInit();
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  DeleteTask(id: number) {

    if (confirm('Estas seguro de eliminar esta tarea?')) {
      this.ServiceTask.deleteTask(id).subscribe({
        next: () => {
          console.log('Tarea eliminada');
          this.ngOnInit();

        },
        error: (err) => {
          console.log('Error al eliminar la tarea');
        }
      });

    }

  }

  EditTask(Id: number,task: TaskM) {
    this.NewTask = {id: Id, title: task.title, description: task.description, dateLimit: task.dateLimit, state: 'Pendiente' };    // clona datos de la tarea seleccionada en NewTask
    this.isEditing = true;  // activa el modo edición

  }

  EditState(id: number,task: TaskM){

    task.state = task.state === 'Completo' ? 'Pendiente' : 'Completo';

    if(id !== undefined){

      this.ServiceTask.UpdateTask(id,task).subscribe({
        next: () => {
            console.log(`Tarea ${task.id} actualizada a ${task.state}`);
            this.ngOnInit();

        },
        error: (err)=> console.error('Error al actulizar')

      })
    }


  }



}


