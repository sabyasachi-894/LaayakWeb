rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  // Classes collection - Read access to all authenticated
		match /classes/{classCode}/{document=**}{
    	allow read: if request.auth != null;
      // All write access to particular CR
      allow write: if request.auth != null && 
      	request.auth.token.name == "cr" &&
        get(/databases/$(database)/documents/cr/$(request.auth.uid)).data.classId == classCode
        ;
      // Update access to particular Teacher
      allow update: if request.auth != null && 
      	request.auth.token.name == "teacher" &&
        exists(/databases/$(database)/documents/teachers/$(request.auth.uid)/classes/$(classCode))
        ;
    }
  // CR collection access to CRs only
  	match /cr/{document}{
    	allow read, create: if request.auth != null && request.auth.token.name == "cr";
      allow update, delete: if request.auth != null && 
      	request.auth.token.name == "cr" &&
        request.auth.uid == document ;
    }
  // Students collection read to all authenticated write to particular Student only
  	match /students/{document}{
    	allow read: if request.auth != null;
      allow write: if request.auth != null && 
      	(
          request.auth.token.name == "student" && request.auth.uid == document
        );
    }
  // Teacher collection read to CR, teacher and write to Teacher only
  	match /teachers/{document}/{documents=**}{
    	allow read: if request.auth != null && 
      	(
      		request.auth.token.name == "cr" ||
          request.auth.token.name == "teacher"
        );
      allow write: if request.auth != null && 
      	request.auth.token.name == "teacher" &&
        request.auth.uid == document ;
    }
  }
}
  	