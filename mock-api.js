/* API boundary: replace these methods with server calls when a backend is ready.
 * No requests, analytics, browser persistence, or external submissions occur here. */
window.supportAPI = (() => {

  const delay = () => new Promise(resolve => setTimeout(resolve,450));
  return {
    async searchResources(options) { return window.directorySearch(options); },
    async prepareDraft({record,region,incidentRegion,goal}) {
      const language=window.uiLanguage||'en';
      await delay();
      if(language==='en'){
        const heading=`[DEMO DRAFT · NOT SUBMITTED]\nGoal: ${window.uiCopy?.[goal]||goal}\nCurrent location: ${window.uiCopy?.[region]||region||'Not provided'}\nIncident location: ${window.uiCopy?.[incidentRegion]||incidentRegion||'Not provided'}`;
        if(goal==='申请生活安排调整')return `${heading}\n\nHello,\n\nFor personal reasons, I would like to request leave, an extension or an adjustment to my current arrangements. Please let me know the available options and any required steps. I do not wish to share further personal details at this time. Please also explain your confidentiality arrangements.\n\nRequested adjustment and dates: to be added by me.\n\nThank you.`;
        return `${heading}\n\nHello, I would like to ${goal==='了解支持与咨询'?'learn about available support and advice':'understand the process and requirements for making a complaint or report'}. Please explain your service scope, fees, confidentiality arrangements and possible next steps.\n\nHere is the record I provided, without a legal assessment. My original wording has not been translated:\nApproximate time: ${record.date||'Not provided / unsure'}\nLocation: ${record.place||'Not provided'}\n\n${record.story||'I prefer not to share incident details at this stage.'}\n\nI would like to decide on next steps at my own pace. Please explain before sharing my information with others.\n\n[Please review this draft and choose an actual recipient. This demo has not verified local law or services.]`;
      }
      const header=`【演示草稿 · 尚未提交】\n目的：${goal}\n当前地区：${region||'未提供'}\n事件发生地区：${incidentRegion||'未提供'}`;
      if(goal==='申请生活安排调整') return `${header}\n\n您好：\n\n我因个人原因需要申请适当的请假、延期或安排调整，希望了解可行方案与所需手续。目前我不希望披露更多个人细节。请告知沟通中的保密安排。\n\n具体调整内容与时间：待我补充。\n\n谢谢。`;
      return `${header}\n\n您好，我希望${goal==='了解支持与咨询'?'先了解可获得的支持和咨询服务':'了解投诉或报案的程序与所需材料'}。请先向我说明服务范围、费用、保密安排和可能的后续步骤。\n\n以下为我提供的记录，尚未作法律定性：\n大致时间：${record.date||'未提供 / 记不清'}\n地点：${record.place||'未提供'}\n\n${record.story||'暂不提供事件细节。'}\n\n我希望按自己的节奏决定下一步。请在向其他人分享我的信息前，向我说明。\n\n【请核对内容并选择实际接收机构。本演示没有验证当地法律或渠道。】`;
    },
    async simulateSubmission(){await delay();return {status:'simulation_only',submitted:false};}
  };
})();
