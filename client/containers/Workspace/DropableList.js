class DropableList{
    constructor(config){
        this.classForPlaceHolder = config.placeholder && config.placeholder.className;
        this.sourceListItemClassName = (config.source && config.source.item && config.source.item.className) || "list-item";
        this.dropContainerClassName = (config.target && config.target && config.target.container && config.target.container.className) || "task-list";
        this.sourceActiveItemClassName = (config.source && config.source.item && config.source.item.activeClassName) || "active-list-item";
        this.placeholderId = "task-card-placeholder";
        this.expandType = config.expandType || "vertical";
        this.self = this;
        this.resetall();
    }

    resetall = () => {
        this.targetElement = null;
        this.sourceElement = null;
        this.mousePos = {
            x: 0,
            y: 0
        }
        this.mosUpdatePos = {
            x: 0,
            y: 0,
        }
        this.mosDiff = {
            x: 0,
            y: 0
        }
        this.sourceClickEventHandler = null;
        this.dragging = false;
        this.targetIndex = 0;
        this.currentTargetList = null;
    }
    removeAllPlaceHolders = () => {
        const el = document.getElementById(this.placeholderId);
        el && el.remove(); 
    }
    createPlaceHolderForTask = (height,width) => {
        // creating placeholder
        const placeholder = document.createElement("DIV");
        placeholder.setAttribute("id", this.placeholderId);
        placeholder.setAttribute("style",`
            width: ${this.expandType === "vertical" ? "auto" :  width+"px"};
            background-color: #e5eef5;
            margin: 0.5em;
            border: 8px;
            transition: 0.1s linear all;
            opacity: 1;
        `);
        // placeholder.setAttribute("list_id",list_id)
        placeholder.style.height = height + "px";
        if(this.classForPlaceHolder){
            placeholder.setAttribute("class",this.classForPlaceHolder);
        }
        return placeholder;
    }
    onMouseEnter = (e,cb) => {
        // console.log("MouseEnter",e.target);
        let ev = e;
        if(!ev.target){
            return ;
        }
        if(!ev.target.classList.contains(this.sourceListItemClassName)){
            ev = e.target.closest(`.${this.sourceListItemClassName}`);
        }else{
            ev = e.target;   
        }
        if(!ev){
            return false;
        }
        this.sourceElement = ev;
        ev.classList.add(this.sourceActiveItemClassName);
        ev.style.cursor = "all-scroll";
        this.callBack(cb);
    }
    onMouseLeave = (e,cb) =>{
        console.log(e.type);
        e.preventDefault();
        e.stopPropagation();
        if(this.sourceElement){
            this.sourceElement.setAttribute("style","");
            this.sourceElement.classList.remove(this.sourceActiveItemClassName);
        }
        this.resetall();
        this.removeAllPlaceHolders();
        this.callBack(cb);
    }
    onMouseOver = (cb) =>{
        console.log("Mouse Is Over")
        this.callBack(cb);
    }
    onMouseMove = (e,cb) =>{
        this.mosUpdatePos = {
            x: e.clientX,
            y: e.clientY
        }
        if(e.target && !e.target.classList.contains(this.sourceListItemClassName)){
            this.onMouseEnter(e);
        }
        
        if(this.sourceElement && this.dragging){
            const rect = this.sourceElement.getBoundingClientRect();
            const elems = document.elementsFromPoint(rect.x,rect.y);
            
            const css = `
                z-index: 100;
                position: absolute;
                height: ${rect.height}px;
                width: ${rect.width}px;
                top: ${e.clientY + this.mosDiff.y}px;
                left: ${e.clientX + this.mosDiff.x}px;`;
                
            this.sourceElement.setAttribute("style",css);

            // if hover on listbody
            let placeholder = this.createPlaceHolderForTask(
                    this.sourceElement.clientHeight,
                    this.sourceElement.clientWidth
                );
            const listBody = elems.filter((el) => el.classList.contains(this.dropContainerClassName));
            if(listBody.length){
                
                this.currentTargetList = listBody[0];
                
                
                const lastCard = listBody[0].querySelector(`.${this.sourceListItemClassName}:last-child`);
                
                if(this.expandType === "horizontal" && Math.abs(this.mousePos.y - this.mosUpdatePos.y) > 30){
                    // lastCard.insertAdjacentElement("beforebegin",placeholder);
                    // placeholder.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                    // this.targetIndex = parseInt(lastCard.getAttribute("index"))+1;     
                } 
            }
            
            
            
            // if hover on task card
            const possibleTargets = elems.filter((el) =>{
                if(
                    el.classList.contains(this.sourceListItemClassName)
                    &&
                    !el.isSameNode(this.sourceElement)
                ){
                    return el;   
                }
            });
            if(possibleTargets.length){
                this.removeAllPlaceHolders();
                const targetElement = possibleTargets[0];

                const targetRect = targetElement.getBoundingClientRect();
                
                // placeholder = this.createPlaceHolderForTask(rect.height,rect.width);
                // targetElement.style.background = "red";
                if(this.expandType === "vertical" && Math.abs(this.mousePos.y - this.mosUpdatePos.y) >= 30){
                    //check if needs to put on top or bottom
                    if(targetElement.classList.contains(this.classForPlaceHolder)){
                        console.log(this.classForPlaceHolder)
                        return false;
                    }
                    if(
                        rect.y >= (targetRect.y - rect.height - 50)
                        && 
                        rect.y <= (targetRect.y + rect.height/2)+50
                    ){
                        console.log("Push in top");
                        this.targetIndex = parseInt(targetElement.getAttribute("index"));
                        targetElement.insertAdjacentElement("beforebegin",placeholder);
                        placeholder && placeholder.scrollIntoView({behavior: "smooth", block: "start"});
                    }else if(
                        rect.y >=  (targetRect.y + targetRect.height/2 + this.mosDiff.y) && 
                        rect.y <= (targetRect.bottom + targetRect.height + this.mosDiff.y)
                    )
                    {
                        console.log("Push in bottom");
                        this.targetIndex = parseInt(targetElement.getAttribute("index")) + 1;
                        targetElement.insertAdjacentElement("afterend",placeholder);
                        placeholder && placeholder.scrollIntoView({behavior: "smooth", block: "end"});
                    }else{
                        console.log("Push in top else case");
                        this.targetIndex = parseInt(targetElement.getAttribute("index"));
                        targetElement.insertAdjacentElement("beforebegin",placeholder);
                        placeholder && placeholder.scrollIntoView({behavior: "smooth", block: "start"});
                    }
  
                }else if(this.expandType === "horizontal" && Math.abs(this.mousePos.x - this.mosUpdatePos.x) >= 50){
                    // check for left or right
                    // targetElement.style.color = "red";
                    if(
                        rect.x >= (targetRect.x - rect.width - 50)
                        &&
                        rect.x <= (targetRect.width/2 + targetRect.x)+50
                    ){
                        this.removeAllPlaceHolders();
                        console.log("onLeft");
                        this.targetIndex = parseInt(targetElement.getAttribute("index"));
                        targetElement.insertAdjacentElement("beforebegin",placeholder);
                        
                    }else if(
                        rect.x >=  (targetRect.x + targetRect.width/2) && 
                        rect.x <= (targetRect.x + rect.width )+50
                    )
                    {
                        console.log("onRigt");
                        this.targetIndex = parseInt(targetElement.getAttribute("index"))+1;
                        targetElement.insertAdjacentElement("afterend",placeholder);

                    }else{
                        console.log("In else case")
                        this.targetIndex = parseInt(targetElement.getAttribute("index"));
                        targetElement.insertAdjacentElement("beforebegin",placeholder);
                    }
                    this.mousePos = Object.assign({},this.mosUpdatePos);
                }
            }
            // placeholder && placeholder.scrollIntoView({behavior: "smooth"});
            this.targetElement = placeholder;
            this.callBack(cb);
        }
    }
    onMouseDown = (e,cb) =>{
        console.log(e.type);
        e.persist();
        e.stopPropagation();
        let ev = e;
        if(!ev.target){
            return ;
        }
        if(!ev.target.classList.contains(this.sourceListItemClassName)){
            ev = e.target.closest(`.${this.sourceListItemClassName}`);
        }else{
            ev = e.target;   
        }
        if(!ev){
            return false;
        }
        this.sourceElement = ev;
        
        if(this.sourceElement && this.sourceElement.classList.contains(this.sourceListItemClassName)) {
            this.sourceElement.classList.add(this.sourceActiveItemClassName);
            this.sourceElement.style.cursor = "all-scroll";
            this.dragging = true;
            const rect = this.sourceElement.getBoundingClientRect();
            this.mousePos = {
                x: e.clientX,
                y: e.clientY
            }
            this.mosUpdatePos = {
                x: e.clientX,
                y: e.clientY
            }
            this.mosDiff = {
                x: rect.x - e.clientX,
                y: rect.y - e.clientY
            }
            /**
             *  1. copy the click handler so it won't collapse with onMouseUp event
             *  2. attach it after mouseEvent is fired
             */
            // this.sourceClickEventHandler = this.sourceElement["onclick"];
            // this.sourceElement.removeEventListener("onclick",this.sourceClickEventHandler);
        }
        this.callBack(cb);
    }
    getCopyOfInstance = () => {
        return Object.assign(Object.create(this.self),this.self);
    }
    onMouseUp = (e,cb) =>{
        console.log(e.type);            
        e.stopPropagation();
        e.preventDefault();

        if(this.sourceElement){
            this.sourceElement.setAttribute("style","");
            this.sourceElement.classList.remove(this.sourceActiveItemClassName);
            if(this.targetElement){
                // creating a deep copy of the instance
                this.callBack(cb);
                // this.sourceElement.addEventListener("onclick",this.sourceClickEventHandler)
            }
        }
        this.resetall();
        this.removeAllPlaceHolders();
        if(!this.sourceElement || !this.targetElement){
            return false;
        }

    }
    callBack = (cb) => {
        // creating a deep copy of the instance
        if(typeof cb === "function"){
            const copy = this.getCopyOfInstance();
            cb(copy);           
        }else{
            return false;
        }
    }
}

export default DropableList;