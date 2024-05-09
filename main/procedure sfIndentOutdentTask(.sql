procedure sfIndentOutdentTask(
p_tenancy_id in number
,p_project_id in number
,p_input in clob
) as
l_task_id number;
l_parent_id number;
begin
APEX_JSON.parse(p_input);
if APEX_JSON.get_varchar2(p_path => 'action') in('indented','outdented') then
l_task_id := APEX_JSON.get_number(p_path => 'record.TaskID');
for i in(
select * from tb_activities
where id = l_task_id
and project_id = p_project_id
and tenancy_id = p_tenancy_id
) loop



l_parent_id := APEX_JSON.get_number(p_path => 'record.parentItem.taskId');
if l_parent_id is not null then
update tb_activities
set parent_id = l_parent_id
where id = l_task_id;
end if;



end loop;
end if;
end sfIndentOutdentTask;


elsif l_operation in('indented', 'outdented') then
PON_MILESTONE_PKG.sfIndentOutdentTask(
P_TENANCY_ID => :P_TENANCY_ID,
P_PROJECT_ID => :P_PROJECT_ID,
P_INPUT => l_input
);