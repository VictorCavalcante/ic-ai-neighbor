import {Component, OnInit} from '@angular/core';
import {ExecuteService} from './execute.service';

@Component({
  selector: 'app-execute-list',
  templateUrl: './execute.component.html',
  styleUrls: ['./execute.component.scss']
})
export class ExecuteComponent implements OnInit {
  analysisResult: any;
  predictionModel = {
    buying: null,
    maint: null,
    doors: null,
    persons: null,
    lug_boot: null,
    safety: null
  };
  predictionResult:string = null;

  constructor(private executeService: ExecuteService) { }

  ngOnInit(): void { }

  submitPredictionForm(): void {
    this.executeService.predictWithClassifier(this.predictionModel)
      .then(data => {
        let finalResult = data.response.result;
        let predTypes = data.response.types;
        this.predictionResult = predTypes[finalResult];
      })
  }

  executeTest(): void {
    this.executeService.testClassifierAccuracy()
      .then(data => this.analysisResult = data.response);
  }

}
