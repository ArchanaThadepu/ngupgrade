import {Submission} from "../../edge/quoteandbind/common/models/Submission";
import {PASubmissionDraftDataExtension} from "../../edge/quoteandbind/pa/models/PASubmissionDraftDataExtension";


export class PolicyLineExtensionConfiguration {

  static mixinLobDraftDataExtensions(submission: Submission) {
      if(submission && submission.baseData && submission.baseData.productCode === 'PersonalAuto') {
        submission.lobData = submission.lobData || {};
        submission.lobData.personalAuto = submission.lobData.personalAuto || {};
        submission.lobData.personalAuto.coverables = new PASubmissionDraftDataExtension(submission);
      }
  }
}
